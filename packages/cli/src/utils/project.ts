import { execSync } from "child_process"
import fs from "fs-extra"
import path from "path"
import { CONFIG_FILE_NAME, DEFAULT_COMPONENTS_PATH } from "../config/defaults.js"

/** Shape of the shellcn.config.json file. */
export interface ShellcnConfig {
  componentsPath: string
}

export type PackageManager = "npm" | "yarn" | "pnpm"

export interface ProjectPackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export interface MissingProjectPackages {
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

/**
 * Detects which package manager is being used in the current project.
 * Checks for lock files in order: pnpm, yarn, then falls back to npm.
 */
export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn"
  return "npm"
}

/**
 * Reads the consumer package.json from the current working directory.
 */
export async function readProjectPackageJson(
  cwd: string
): Promise<ProjectPackageJson | null> {
  const packageJsonPath = path.join(cwd, "package.json")

  if (!fs.existsSync(packageJsonPath)) {
    return null
  }

  return (await fs.readJSON(packageJsonPath)) as ProjectPackageJson
}

/**
 * Computes the missing runtime and dev package dependencies for a project.
 */
export function getMissingProjectPackages(
  packageJson: ProjectPackageJson | null,
  dependencies: Record<string, string>,
  devDependencies: Record<string, string>
): MissingProjectPackages {
  const declaredDependencies = packageJson?.dependencies ?? {}
  const declaredDevDependencies = packageJson?.devDependencies ?? {}
  const missingDependencies: Record<string, string> = {}
  const missingDevDependencies: Record<string, string> = {}

  for (const [packageName, version] of Object.entries(dependencies)) {
    if (!(packageName in declaredDependencies) && !(packageName in declaredDevDependencies)) {
      missingDependencies[packageName] = version
    }
  }

  for (const [packageName, version] of Object.entries(devDependencies)) {
    if (packageName in dependencies) {
      continue
    }

    if (!(packageName in declaredDependencies) && !(packageName in declaredDevDependencies)) {
      missingDevDependencies[packageName] = version
    }
  }

  return {
    dependencies: missingDependencies,
    devDependencies: missingDevDependencies,
  }
}

/**
 * Builds a package manager install command for runtime or dev packages.
 */
export function buildInstallCommand(
  packageManager: PackageManager,
  packages: string[],
  options?: { dev?: boolean }
): string | null {
  if (packages.length === 0) {
    return null
  }

  const flag = options?.dev ? " -D" : ""
  const packageList = packages.join(" ")

  if (packageManager === "yarn") {
    return `yarn add${flag} ${packageList}`
  }

  if (packageManager === "pnpm") {
    return `pnpm add${flag} ${packageList}`
  }

  return `npm install${flag} ${packageList}`
}

/**
 * Turns a package map into installable package@version specs.
 */
export function toPackageSpecs(
  packages: Record<string, string>
): string[] {
  return Object.entries(packages).map(([packageName, version]) => (
    `${packageName}@${version}`
  ))
}

/**
 * Installs packages in the current project using the detected package manager.
 */
export function installProjectPackages(
  cwd: string,
  packageManager: PackageManager,
  packages: string[],
  options?: { dev?: boolean }
): string | null {
  const command = buildInstallCommand(packageManager, packages, options)

  if (!command) {
    return null
  }

  try {
    execSync(command, { cwd, stdio: "pipe" })
  } catch (error) {
    const stderr = typeof error === "object" && error !== null && "stderr" in error
      ? String((error as { stderr?: Buffer | string }).stderr ?? "").trim()
      : ""
    const stdout = typeof error === "object" && error !== null && "stdout" in error
      ? String((error as { stdout?: Buffer | string }).stdout ?? "").trim()
      : ""
    const details = stderr || stdout

    throw new Error(
      details
        ? `Package installation failed while running "${command}": ${details}`
        : `Package installation failed while running "${command}".`
    )
  }

  return command
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
