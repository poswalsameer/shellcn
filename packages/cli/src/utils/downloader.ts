import fs from "fs-extra"
import path from "path"
import { resolveComponentPath } from "./registry.js"

/**
 * Copies a component template from the registry into the user's project.
 *
 * @param componentPath - Relative path of the component in the registry (e.g., "components/spinner.tsx")
 * @param targetDir - Absolute path to the user's components directory
 * @returns The absolute path where the component was written
 */
export async function downloadComponent(
  componentPath: string,
  targetDir: string
): Promise<string> {
  const sourcePath = resolveComponentPath(componentPath)
  const fileName = path.basename(componentPath)
  const destPath = path.join(targetDir, fileName)

  if (!fs.existsSync(sourcePath)) {
    throw new Error(
      `Component template not found at ${sourcePath}. ` +
      `The registry may be incomplete.`
    )
  }

  // Ensure the target directory exists
  await fs.ensureDir(targetDir)

  // Copy the component file
  await fs.copyFile(sourcePath, destPath)

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
