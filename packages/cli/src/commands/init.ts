import chalk from "chalk"
import fs from "fs-extra"
import path from "path"
import {
  DEFAULT_COMPONENTS_PATH,
  CONFIG_FILE_NAME,
  REQUIRED_DEPENDENCIES,
} from "../config/defaults.js"
import {
  buildInstallCommand,
  detectPackageManager,
  installProjectPackages,
  writeConfig,
} from "../utils/project.js"

/**
 * Handles the `shellcn init` command.
 * Sets up shellcn in the current project:
 * 1. Creates the components directory
 * 2. Writes the config file
 * 3. Installs required dependencies (ink, react)
 */
export async function initCommand(): Promise<void> {
  const cwd = process.cwd()

  console.log()
  console.log(chalk.bold.cyan("  shellcn") + chalk.dim(" — Terminal UI Components"))
  console.log()

  // Check if already initialized
  const configPath = path.join(cwd, CONFIG_FILE_NAME)
  if (fs.existsSync(configPath)) {
    console.log(
      chalk.yellow("  ⚠ ") +
      chalk.dim("shellcn is already initialized in this project.")
    )
    console.log(
      chalk.dim("  Config file found: ") + chalk.white(CONFIG_FILE_NAME)
    )
    console.log()
    return
  }

  // Step 1: Create components directory
  const componentsDir = path.join(cwd, DEFAULT_COMPONENTS_PATH)
  await fs.ensureDir(componentsDir)
  console.log(
    chalk.green("  ✓ ") +
    chalk.dim("Created components directory: ") +
    chalk.white(DEFAULT_COMPONENTS_PATH)
  )

  // Step 2: Write config file
  await writeConfig(cwd, {
    componentsPath: DEFAULT_COMPONENTS_PATH,
  })
  console.log(
    chalk.green("  ✓ ") +
    chalk.dim("Created config file: ") +
    chalk.white(CONFIG_FILE_NAME)
  )

  // Step 3: Install dependencies
  const pm = detectPackageManager(cwd)
  const installCmd = buildInstallCommand(pm, [...REQUIRED_DEPENDENCIES])

  console.log(
    chalk.blue("  ◆ ") +
    chalk.dim("Installing dependencies with ") +
    chalk.white(pm) +
    chalk.dim("...")
  )

  try {
    installProjectPackages(cwd, pm, [...REQUIRED_DEPENDENCIES])
    console.log(
      chalk.green("  ✓ ") +
      chalk.dim("Installed: ") +
      chalk.white(REQUIRED_DEPENDENCIES.join(", "))
    )
  } catch {
    console.log(
      chalk.yellow("  ⚠ ") +
      chalk.dim("Could not install dependencies automatically.")
    )
    console.log(
      chalk.dim("  Run manually: ") + chalk.white(installCmd ?? "")
    )
  }

  // Done
  console.log()
  console.log(chalk.green("  ✓ ") + chalk.bold("shellcn initialized successfully!"))
  console.log()
  console.log(chalk.dim("  Next steps:"))
  console.log(chalk.dim("  1. Add components:  ") + chalk.cyan("npx shellcn-tui add separator"))
  console.log(chalk.dim("  2. List components: ") + chalk.cyan("npx shellcn-tui list"))
  console.log()
}
