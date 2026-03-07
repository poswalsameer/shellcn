import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
import { REGISTRY_FILE_NAME } from "../config/defaults.js"

/** A single component entry from the registry manifest. */
export interface ComponentEntry {
  /** Relative path to the component file inside the registry. */
  path: string
  /** Short description of the component. */
  description: string
  /** Optional list of additional npm dependencies required by the component. */
  dependencies?: string[]
}

/** Shape of the components.json registry manifest. */
export interface ComponentRegistry {
  components: Record<string, ComponentEntry>
}

/**
 * Resolves the absolute path to the bundled registry directory.
 * The registry lives at `packages/registry/` relative to the CLI package root.
 *
 * When bundled by tsup, the output is at packages/cli/dist/index.js.
 * So we navigate: dist/ → cli/ (1 up) → packages/registry/ (1 up + "registry").
 */
function getRegistryDir(): string {
  const currentFile = fileURLToPath(import.meta.url)
  const currentDir = path.dirname(currentFile)
  // From packages/cli/dist/ → packages/cli/ → packages/ → packages/registry/
  const packagesDir = path.resolve(currentDir, "..", "..")
  return path.resolve(packagesDir, "registry")
}

/**
 * Loads and parses the component registry manifest.
 * Reads from the bundled registry directory.
 */
export async function loadRegistry(): Promise<ComponentRegistry> {
  const registryDir = getRegistryDir()
  const manifestPath = path.join(registryDir, REGISTRY_FILE_NAME)

  if (!fs.existsSync(manifestPath)) {
    throw new Error(
      `Registry manifest not found at ${manifestPath}. ` +
      `Make sure the registry package is available.`
    )
  }

  const raw = await fs.readJSON(manifestPath)
  return raw as ComponentRegistry
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
 * Resolves the absolute file path for a component template in the registry.
 */
export function resolveComponentPath(componentPath: string): string {
  const registryDir = getRegistryDir()
  return path.join(registryDir, componentPath)
}
