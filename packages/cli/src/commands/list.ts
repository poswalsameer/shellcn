import chalk from "chalk"
import { loadRegistry } from "../utils/registry.js"

/**
 * Handles the `shellcn list` command.
 * Prints a formatted table of all available components from the registry.
 */
export async function listCommand(): Promise<void> {
  console.log()
  console.log(chalk.bold.cyan("  shellcn") + chalk.dim(" — Available Components"))
  console.log()

  try {
    const registry = await loadRegistry()
    const components = Object.entries(registry.components)

    if (components.length === 0) {
      console.log(chalk.dim("  No components found in the registry."))
      console.log()
      return
    }

    // Calculate column widths for alignment
    const maxNameLen = Math.max(...components.map(([name]) => name.length))
    const nameWidth = Math.max(maxNameLen, 10)

    // Table header
    console.log(
      chalk.dim("  ") +
      chalk.bold.white("Name".padEnd(nameWidth + 2)) +
      chalk.bold.white("Description")
    )
    console.log(
      chalk.dim("  ") +
      chalk.dim("─".repeat(nameWidth + 2)) +
      chalk.dim("─".repeat(30))
    )

    // Table rows
    for (const [name, entry] of components) {
      console.log(
        chalk.dim("  ") +
        chalk.cyan(name.padEnd(nameWidth + 2)) +
        chalk.dim(entry.description)
      )
    }

    console.log()
    console.log(
      chalk.dim("  Add a component: ") +
      chalk.cyan("npx shellcn add <name>")
    )
    console.log()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.log(chalk.red("  ✗ ") + chalk.dim(message))
    console.log()
  }
}
