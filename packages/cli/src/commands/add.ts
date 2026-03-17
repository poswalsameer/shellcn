import chalk from "chalk"
import readline from "readline"
import { readConfig, resolveComponentsDir } from "../utils/project.js"
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

  console.log()

  // Read project config
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

    const addedComponents: string[] = []
    const skippedComponents: string[] = []

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
  }

  console.log()
}
