import chalk from "chalk"
import readline from "readline"
import {
  detectPackageManager,
  getMissingProjectPackages,
  installProjectPackages,
  readConfig,
  readProjectPackageJson,
  resolveComponentsDir,
  toPackageSpecs,
} from "../utils/project.js"
import { getComponent, resolveComponentInstallPlan } from "../utils/registry.js"
import { downloadComponent, componentExists } from "../utils/downloader.js"

/**
 * Prompts the user with a yes/no question via stdin.
 */
function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes")
    })
  })
}

/**
 * Handles the `shellcn add <component>` command.
 * Looks up a component in the registry and copies it into the user's project.
 * Prompts for overwrite if the component already exists.
 */
export async function addCommand(componentName: string): Promise<void> {
  const cwd = process.cwd()
  const addedComponents: string[] = []
  const skippedComponents: string[] = []
  const installedDependencies: string[] = []
  const installedDevDependencies: string[] = []

  console.log()

  const config = await readConfig(cwd)
  if (!config) {
    console.log(
      chalk.red("  ✗ ") +
      chalk.dim("shellcn is not initialized in this project.")
    )
    console.log(
      chalk.dim("  Run ") +
      chalk.cyan("npx shellcn-tui init") +
      chalk.dim(" first.")
    )
    console.log()
    return
  }

  const targetDir = resolveComponentsDir(cwd, config)

  try {
    const installPlan = await resolveComponentInstallPlan(componentName)
    const requestedComponent = await getComponent(componentName)
    const packageJson = await readProjectPackageJson(cwd)

    if (!requestedComponent) {
      console.log(
        chalk.red("  ✗ ") +
        chalk.dim("Component ") +
        chalk.white(`"${componentName}"`) +
        chalk.dim(" not found in the registry.")
      )
      console.log(
        chalk.dim("  Run ") +
        chalk.cyan("npx shellcn-tui list") +
        chalk.dim(" to see available components.")
      )
      console.log()
      return
    }

    const missingPackages = getMissingProjectPackages(
      packageJson,
      installPlan.dependencies,
      installPlan.devDependencies
    )
    const runtimeSpecs = toPackageSpecs(missingPackages.dependencies)
    const devSpecs = toPackageSpecs(missingPackages.devDependencies)

    if ((runtimeSpecs.length > 0 || devSpecs.length > 0) && !packageJson) {
      throw new Error(
        "No package.json found in the current project. shellcn cannot install npm dependencies automatically."
      )
    }

    let shouldOverwriteRequested = true
    if (componentExists(requestedComponent.path, targetDir)) {
      shouldOverwriteRequested = await confirm(
        chalk.yellow("  ⚠ ") +
        chalk.dim(`${componentName} already exists. Overwrite? `) +
        chalk.white("[y/N] ")
      )
    }

    if (installPlan.components.length > 1) {
      console.log(
        chalk.blue("  ◆ ") +
        chalk.dim("Resolved dependencies: ") +
        chalk.white(installPlan.components.join(" -> "))
      )
    }

    if (runtimeSpecs.length > 0 || devSpecs.length > 0) {
      const packageManager = detectPackageManager(cwd)

      if (runtimeSpecs.length > 0) {
        console.log(
          chalk.blue("  ◆ ") +
          chalk.dim("Installing dependencies with ") +
          chalk.white(packageManager) +
          chalk.dim("...")
        )
        installProjectPackages(cwd, packageManager, runtimeSpecs)
        installedDependencies.push(...Object.keys(missingPackages.dependencies))
        console.log(
          chalk.green("  ✓ ") +
          chalk.dim("Installed dependencies: ") +
          chalk.white(Object.keys(missingPackages.dependencies).join(", "))
        )
      }

      if (devSpecs.length > 0) {
        console.log(
          chalk.blue("  ◆ ") +
          chalk.dim("Installing devDependencies with ") +
          chalk.white(packageManager) +
          chalk.dim("...")
        )
        installProjectPackages(cwd, packageManager, devSpecs, { dev: true })
        installedDevDependencies.push(...Object.keys(missingPackages.devDependencies))
        console.log(
          chalk.green("  ✓ ") +
          chalk.dim("Installed devDependencies: ") +
          chalk.white(Object.keys(missingPackages.devDependencies).join(", "))
        )
      }
    }

    for (const name of installPlan.components) {
      const component = await getComponent(name)

      if (!component) {
        throw new Error(`Component "${name}" is missing from the registry.`)
      }

      const isRequestedComponent = name === componentName
      const alreadyExists = componentExists(component.path, targetDir)

      if (alreadyExists && (!isRequestedComponent || !shouldOverwriteRequested)) {
        skippedComponents.push(name)
        continue
      }

      const destPath = await downloadComponent(component.path, targetDir)
      addedComponents.push(name)

      console.log(
        chalk.green("  ✓ ") +
        chalk.dim("Added ") +
        chalk.bold.white(name) +
        chalk.dim(" → ") +
        chalk.white(destPath.replace(cwd, "."))
      )
    }

    if (addedComponents.length > 0) {
      console.log(
        chalk.blue("  ◆ ") +
        chalk.dim("Added components: ") +
        chalk.white(addedComponents.join(", "))
      )
    }

    if (skippedComponents.length > 0) {
      console.log(
        chalk.blue("  ◆ ") +
        chalk.dim("Skipped existing: ") +
        chalk.white(skippedComponents.join(", "))
      )
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.log(chalk.red("  ✗ ") + chalk.dim(message))

    if (installedDependencies.length > 0) {
      console.log(
        chalk.yellow("  ⚠ ") +
        chalk.dim("Installed dependencies before failure: ") +
        chalk.white(installedDependencies.join(", "))
      )
    }

    if (installedDevDependencies.length > 0) {
      console.log(
        chalk.yellow("  ⚠ ") +
        chalk.dim("Installed devDependencies before failure: ") +
        chalk.white(installedDevDependencies.join(", "))
      )
    }

    if (addedComponents.length > 0) {
      console.log(
        chalk.yellow("  ⚠ ") +
        chalk.dim("Added components before failure: ") +
        chalk.white(addedComponents.join(", "))
      )
    }

    if (skippedComponents.length > 0) {
      console.log(
        chalk.yellow("  ⚠ ") +
        chalk.dim("Skipped components before failure: ") +
        chalk.white(skippedComponents.join(", "))
      )
    }
  }

  console.log()
}
