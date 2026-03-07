import chalk from "chalk"
import readline from "readline"
import { readConfig, resolveComponentsDir } from "../utils/project.js"
import { loadRegistry, getComponent } from "../utils/registry.js"
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
      chalk.cyan("npx shellcn init") +
      chalk.dim(" first.")
    )
    console.log()
    return
  }

  // Look up the component
  const component = await getComponent(componentName)
  if (!component) {
    console.log(
      chalk.red("  ✗ ") +
      chalk.dim("Component ") +
      chalk.white(`"${componentName}"`) +
      chalk.dim(" not found in the registry.")
    )
    console.log(
      chalk.dim("  Run ") +
      chalk.cyan("npx shellcn list") +
      chalk.dim(" to see available components.")
    )
    console.log()
    return
  }

  const targetDir = resolveComponentsDir(cwd, config)

  // Check if component already exists
  if (componentExists(component.path, targetDir)) {
    const shouldOverwrite = await confirm(
      chalk.yellow("  ⚠ ") +
      chalk.dim(`${componentName} already exists. Overwrite? `) +
      chalk.white("[y/N] ")
    )

    if (!shouldOverwrite) {
      console.log(chalk.dim("  Skipped."))
      console.log()
      return
    }
  }

  // Download and copy the component
  try {
    const destPath = await downloadComponent(component.path, targetDir)
    console.log(
      chalk.green("  ✓ ") +
      chalk.dim("Added ") +
      chalk.bold.white(componentName) +
      chalk.dim(" → ") +
      chalk.white(destPath.replace(cwd, "."))
    )

    // Show dependencies if any
    if (component.dependencies && component.dependencies.length > 0) {
      console.log(
        chalk.blue("  ◆ ") +
        chalk.dim("This component requires: ") +
        chalk.white(component.dependencies.join(", "))
      )
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.log(chalk.red("  ✗ ") + chalk.dim(message))
  }

  console.log()
}
