import fs from "fs-extra"
import path from "path"
import { resolveComponentPath } from "./registry.js"

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
  const fileName = path.basename(componentPath)
  const destPath = path.join(targetDir, fileName)

  const response = await fetch(sourceUrl)

  if (!response.ok) {
    throw new Error(
      `Component template could not be loaded from ${sourceUrl}. HTTP Status: ${response.status}. ` +
      `The remote registry might be missing this file.`
    )
  }

  const content = await response.text()

  // Ensure the target directory exists
  await fs.ensureDir(targetDir)

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
  const fileName = path.basename(componentPath)
  return fs.existsSync(path.join(targetDir, fileName))
}
