import { REGISTRY_FILE_NAME } from "../config/defaults.js"

/** URL to the raw GitHub repository registry. */
export const REGISTRY_BASE_URL = "https://raw.githubusercontent.com/poswalsameer/shellcn/main/packages/registry"

/** A single component entry from the registry manifest. */
export interface ComponentEntry {
  /** Relative path to the component file inside the registry. */
  path: string
  /** Short description of the component. */
  description: string
  /** Optional list of additional npm dependencies required by the component. */
  dependencies?: string[]
  /** Optional list of other shellcn component names this component requires. */
  registryDependencies?: string[]
}

/** Shape of the components.json registry manifest. */
export interface ComponentRegistry {
  components: Record<string, ComponentEntry>
}

/**
 * Loads and parses the component registry manifest remotely.
 * Fetches directly from the GitHub repository.
 */
export async function loadRegistry(): Promise<ComponentRegistry> {
  const manifestUrl = `${REGISTRY_BASE_URL}/${REGISTRY_FILE_NAME}`

  try {
    const response = await fetch(manifestUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch registry manifest: HTTP ${response.status}`)
    }

    return (await response.json()) as ComponentRegistry
  } catch (error) {
    throw new Error(
      `Could not load registry manifest from ${manifestUrl}. ` +
      `Make sure you have an active internet connection.`
    )
  }
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
