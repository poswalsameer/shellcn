import { REGISTRY_FILE_NAME } from "../config/defaults.js"

/** URL to the raw GitHub repository registry. */
export const REGISTRY_BASE_URL = "https://raw.githubusercontent.com/poswalsameer/shellcn/main/packages/registry"
export const REGISTRY_METADATA_FILE_NAME = "component-metadata.json"

/** A single component entry from the registry manifest. */
export interface ComponentEntry {
  /** Relative path to the component file inside the registry. */
  path: string
  /** Short description of the component. */
  description: string
}

/** Shape of the components.json registry manifest. */
export interface ComponentRegistry {
  components: Record<string, ComponentEntry>
}

/** Additional metadata for a registry component. */
export interface ComponentMetadataEntry {
  /** Additional shellcn components that must be installed first. */
  registryDependencies: string[]
  /** Runtime npm dependencies required by the component. */
  dependencies: Record<string, string>
  /** Development-only npm dependencies required by the component. */
  devDependencies: Record<string, string>
}

/** Shape of the component metadata manifest. */
export interface ComponentMetadataRegistry {
  components: Record<string, ComponentMetadataEntry>
}

/** Resolved install plan for a component and its transitive dependencies. */
export interface ComponentInstallPlan {
  components: string[]
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

let registryPromise: Promise<ComponentRegistry> | null = null
let metadataPromise: Promise<ComponentMetadataRegistry> | null = null

/**
 * Loads and parses a registry JSON file from the remote repository.
 */
async function fetchRegistryFile<T>(
  fileName: string,
  label: string
): Promise<T> {
  const fileUrl = `${REGISTRY_BASE_URL}/${fileName}`

  try {
    const response = await fetch(fileUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch ${label}: HTTP ${response.status}`)
    }

    return (await response.json()) as T
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown error"
    throw new Error(
      `Could not load ${label} from ${fileUrl}: ${details}`
    )
  }
}

/**
 * Returns the component metadata entry for a name, or a safe empty default.
 */
function getMetadataEntry(
  metadata: ComponentMetadataRegistry,
  name: string
): ComponentMetadataEntry {
  return metadata.components[name] ?? {
    registryDependencies: [],
    dependencies: {},
    devDependencies: {},
  }
}

/**
 * Merges a package dependency into the resolved install plan.
 */
function mergePackage(
  runtimeDeps: Record<string, string>,
  devDeps: Record<string, string>,
  kind: "dependencies" | "devDependencies",
  componentName: string,
  packageName: string,
  version: string
): void {
  const runtimeVersion = runtimeDeps[packageName]
  const devVersion = devDeps[packageName]

  if (kind === "dependencies") {
    if (devVersion && devVersion !== version) {
      throw new Error(
        `Conflicting versions for ${packageName}: ` +
        `${componentName} requires ${version} in dependencies but another component requires ${devVersion} in devDependencies.`
      )
    }

    if (runtimeVersion && runtimeVersion !== version) {
      throw new Error(
        `Conflicting versions for ${packageName}: ` +
        `${componentName} requires ${version} but another component requires ${runtimeVersion}.`
      )
    }

    runtimeDeps[packageName] = version
    delete devDeps[packageName]
    return
  }

  if (runtimeVersion) {
    if (runtimeVersion !== version) {
      throw new Error(
        `Conflicting versions for ${packageName}: ` +
        `${componentName} requires ${version} in devDependencies but another component requires ${runtimeVersion} in dependencies.`
      )
    }

    return
  }

  if (devVersion && devVersion !== version) {
    throw new Error(
      `Conflicting versions for ${packageName}: ` +
      `${componentName} requires ${version} but another component requires ${devVersion}.`
    )
  }

  devDeps[packageName] = version
}

/**
 * Validates that metadata references only known registry components.
 */
function validateMetadata(
  registry: ComponentRegistry,
  metadata: ComponentMetadataRegistry
): void {
  const registryNames = new Set(Object.keys(registry.components))

  for (const [componentName, entry] of Object.entries(metadata.components)) {
    if (!registryNames.has(componentName)) {
      throw new Error(
        `Metadata entry "${componentName}" does not exist in ${REGISTRY_FILE_NAME}.`
      )
    }

    if (entry.registryDependencies.includes(componentName)) {
      throw new Error(
        `Component "${componentName}" cannot depend on itself in registryDependencies.`
      )
    }

    for (const dependencyName of entry.registryDependencies) {
      if (!registryNames.has(dependencyName)) {
        throw new Error(
          `Component "${componentName}" references unknown registry dependency "${dependencyName}".`
        )
      }
    }
  }
}

/**
 * Loads and parses the component registry manifest remotely.
 * Fetches directly from the GitHub repository.
 */
export async function loadRegistry(): Promise<ComponentRegistry> {
  if (!registryPromise) {
    registryPromise = fetchRegistryFile<ComponentRegistry>(
      REGISTRY_FILE_NAME,
      "registry manifest"
    ).catch((error) => {
      registryPromise = null
      throw error
    })
  }

  return await registryPromise
}

/**
 * Loads and parses the component metadata manifest remotely.
 */
export async function loadComponentMetadata(): Promise<ComponentMetadataRegistry> {
  if (!metadataPromise) {
    metadataPromise = fetchRegistryFile<ComponentMetadataRegistry>(
      REGISTRY_METADATA_FILE_NAME,
      "component metadata manifest"
    ).catch((error) => {
      metadataPromise = null
      throw error
    })
  }

  const metadata = await metadataPromise
  const registry = await loadRegistry()
  validateMetadata(registry, metadata)

  return metadata
}

/**
 * Looks up a single component by name from the registry.
 * Returns null if the component is not found.
 */
export async function getComponent(
  name: string
): Promise<ComponentEntry | null> {
  const registry = await loadRegistry()
  return registry.components[name] ?? null
}

/**
 * Looks up a single component metadata entry by name from the registry metadata.
 */
export async function getComponentMetadata(
  name: string
): Promise<ComponentMetadataEntry | null> {
  const metadata = await loadComponentMetadata()
  return metadata.components[name] ?? null
}

/**
 * Returns a list of all available component names.
 */
export async function listComponents(): Promise<string[]> {
  const registry = await loadRegistry()
  return Object.keys(registry.components)
}

/**
 * Resolves the remote URL for a component template.
 */
export function resolveComponentPath(componentPath: string): string {
  // Prevent double slashes when joining the URL
  const normalizedPath = componentPath.startsWith("/") ? componentPath.slice(1) : componentPath
  return `${REGISTRY_BASE_URL}/${normalizedPath}`
}

/**
 * Resolves the full dependency-aware install plan for a component.
 */
export async function resolveComponentInstallPlan(
  componentName: string
): Promise<ComponentInstallPlan> {
  const [registry, metadata] = await Promise.all([
    loadRegistry(),
    loadComponentMetadata(),
  ])

  if (!registry.components[componentName]) {
    throw new Error(
      `Component "${componentName}" does not exist in ${REGISTRY_FILE_NAME}.`
    )
  }

  const orderedComponents: string[] = []
  const runtimeDeps: Record<string, string> = {}
  const devDeps: Record<string, string> = {}
  const visiting = new Set<string>()
  const visited = new Set<string>()

  function visit(name: string, trail: string[]): void {
    if (!registry.components[name]) {
      const parentName = trail[trail.length - 1]
      throw new Error(
        `Component "${parentName}" references unknown registry dependency "${name}".`
      )
    }

    if (visiting.has(name)) {
      const cycleStart = trail.indexOf(name)
      const cycle = [...trail.slice(cycleStart), name].join(" -> ")
      throw new Error(`Cyclic registryDependencies detected: ${cycle}.`)
    }

    if (visited.has(name)) {
      return
    }

    visiting.add(name)

    const metadataEntry = getMetadataEntry(metadata, name)

    for (const dependencyName of metadataEntry.registryDependencies) {
      if (dependencyName === name) {
        throw new Error(
          `Component "${name}" cannot depend on itself in registryDependencies.`
        )
      }

      visit(dependencyName, [...trail, name])
    }

    for (const [packageName, version] of Object.entries(metadataEntry.dependencies)) {
      mergePackage(runtimeDeps, devDeps, "dependencies", name, packageName, version)
    }

    for (const [packageName, version] of Object.entries(metadataEntry.devDependencies)) {
      mergePackage(runtimeDeps, devDeps, "devDependencies", name, packageName, version)
    }

    visiting.delete(name)
    visited.add(name)
    orderedComponents.push(name)
  }

  visit(componentName, [])

  return {
    components: orderedComponents,
    dependencies: runtimeDeps,
    devDependencies: devDeps,
  }
}
