import fs from "fs-extra"
import path from "path"
import { resolveComponentPath } from "./registry.js"

const REGISTRY_COMPONENTS_DIR = "components/"

/**
 * Maps a registry component path to its local destination path.
 * Registry files are stored under `components/`, while local installs live
 * directly inside the configured components directory.
 */
export function resolveLocalComponentPath(
  componentPath: string,
  targetDir: string
): string {
  const normalizedPath = componentPath.replaceAll("\\", "/")
  const relativeComponentPath = normalizedPath.startsWith(REGISTRY_COMPONENTS_DIR)
    ? normalizedPath.slice(REGISTRY_COMPONENTS_DIR.length)
    : normalizedPath

  const segments = relativeComponentPath.split("/").filter(Boolean)

  if (segments.length === 0 || segments.includes("..")) {
    throw new Error(`Invalid registry component path: ${componentPath}`)
  }

  return path.join(targetDir, ...segments)
}

/**
 * Downloads a component template from the GitHub registry into the user's project.
 *
 * @param componentPath - Relative path of the component in the registry (e.g., "components/separator.tsx")
 * @param targetDir - Absolute path to the user's components directory
 * @returns The absolute path where the component was written
 */
export async function downloadComponent(
  componentPath: string,
  targetDir: string
): Promise<string> {
  const sourceUrl = resolveComponentPath(componentPath)
  const destPath = resolveLocalComponentPath(componentPath, targetDir)

  const response = await fetch(sourceUrl)

  if (!response.ok) {
    throw new Error(
      `Component template could not be loaded from ${sourceUrl}. HTTP Status: ${response.status}. ` +
      `The remote registry might be missing this file.`
    )
  }

  const content = await response.text()

  // Ensure the target directory exists
  await fs.ensureDir(path.dirname(destPath))

  // Write the fetched source code to the destination
  await fs.writeFile(destPath, content)

  return destPath
}

/**
 * Checks whether a component file already exists in the user's project.
 */
export function componentExists(
  componentPath: string,
  targetDir: string
): boolean {
  return fs.existsSync(resolveLocalComponentPath(componentPath, targetDir))
}
