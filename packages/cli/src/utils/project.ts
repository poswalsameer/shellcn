import fs from "fs-extra"
import path from "path"
import { CONFIG_FILE_NAME, DEFAULT_COMPONENTS_PATH } from "../config/defaults.js"

/** Shape of the shellcn.config.json file. */
export interface ShellcnConfig {
  componentsPath: string
}

/**
 * Detects which package manager is being used in the current project.
 * Checks for lock files in order: pnpm, yarn, then falls back to npm.
 */
export function detectPackageManager(cwd: string): "npm" | "yarn" | "pnpm" {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn"
  return "npm"
}

/**
 * Reads the shellcn config from the current working directory.
 * Returns null if the config file does not exist.
 */
export async function readConfig(cwd: string): Promise<ShellcnConfig | null> {
  const configPath = path.join(cwd, CONFIG_FILE_NAME)

  if (!fs.existsSync(configPath)) {
    return null
  }

  const raw = await fs.readJSON(configPath)
  return raw as ShellcnConfig
}

/**
 * Writes a shellcn config file to the current working directory.
 */
export async function writeConfig(
  cwd: string,
  config: ShellcnConfig
): Promise<void> {
  const configPath = path.join(cwd, CONFIG_FILE_NAME)
  await fs.writeJSON(configPath, config, { spaces: 2 })
}

/**
 * Resolves the absolute components directory from config or defaults.
 */
export function resolveComponentsDir(
  cwd: string,
  config: ShellcnConfig | null
): string {
  const componentsPath = config?.componentsPath ?? DEFAULT_COMPONENTS_PATH
  return path.resolve(cwd, componentsPath)
}
