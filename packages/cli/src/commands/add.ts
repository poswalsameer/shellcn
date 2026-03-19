import chalk from "chalk"
import readline from "readline"
import { readConfig, resolveComponentsDir } from "../utils/project.js"
import { loadRegistry, type ComponentEntry } from "../utils/registry.js"
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
 * Recursively resolves all registry dependencies for a component,
 * returning a de-duplicated, topologically-sorted install order
 * (dependencies always come before the component that needs them).
 *
 * Handles circular / repeated references safely via a `visited` set.
 */
async function resolveAllDependencies(
  componentName: string,
  registry: Record<string, ComponentEntry>,
  visited: Set<string> = new Set()
): Promise<string[]> {
  if (visited.has(componentName)) return []
  visited.add(componentName)

  const entry = registry[componentName]
  if (!entry) return []

  const deps = entry.registryDependencies ?? []
  const result: string[] = []

  for (const dep of deps) {
    // Recursively gather transitive deps first (depth-first)
    const transitive = await resolveAllDependencies(dep, registry, visited)
    result.push(...transitive)
    // Only add the dep itself if not already queued
    if (!result.includes(dep)) {
      result.push(dep)
    }
  }

  return result
}

/**
 * Downloads and installs a single component file into the target directory.
 * Returns true if the file was written, false if it was skipped.
 */
async function installComponent(
  componentName: string,
  entry: ComponentEntry,
  targetDir: string,
  cwd: string,
  overwrite: boolean
): Promise<boolean> {
  const destPath = await downloadComponent(entry.path, targetDir)
  console.log(
    chalk.green("  ✓ ") +
    chalk.dim("Added ") +
    chalk.bold.white(componentName) +
    chalk.dim(" → ") +
    chalk.white(destPath.replace(cwd, "."))
  )
  return true
}

/**
 * Handles the `shellcn add <component>` command.
 * Looks up a component in the registry, resolves all registry
 * dependencies, and installs any that are missing — before installing
 * the requested component itself.
 * Prompts for overwrite if the main component already exists.
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

  // Load the full registry once (used for dep resolution too)
  let registry: Record<string, ComponentEntry>
  try {
    const registryData = await loadRegistry()
    registry = registryData.components
  } catch {
    console.log(chalk.red("  ✗ ") + chalk.dim("Could not load the component registry. Check your internet connection."))
    console.log()
    return
  }

  // Look up the requested component
  const component = registry[componentName]
  if (!component) {
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

  const targetDir = resolveComponentsDir(cwd, config)

  // ─── Dependency resolution ────────────────────────────────────────────────
  const depNames = await resolveAllDependencies(componentName, registry)

  if (depNames.length > 0) {
    // Separate deps into missing vs already present
    const missingDeps = depNames.filter(
      (dep) => registry[dep] && !componentExists(registry[dep]!.path, targetDir)
    )
    const presentDeps = depNames.filter(
      (dep) => registry[dep] && componentExists(registry[dep]!.path, targetDir)
    )

    if (presentDeps.length > 0) {
      console.log(
        chalk.blue("  ◆ ") +
        chalk.dim("Dependencies already installed: ") +
        chalk.white(presentDeps.join(", "))
      )
    }

    if (missingDeps.length > 0) {
      console.log(
        chalk.yellow("  ⚠ ") +
        chalk.dim(`"${componentName}" requires: `) +
        chalk.white(missingDeps.join(", ")) +
        chalk.dim(" — installing missing dependencies...")
      )
      console.log()

      for (const dep of missingDeps) {
        const depEntry = registry[dep]
        if (!depEntry) continue

        try {
          await installComponent(dep, depEntry, targetDir, cwd, true)
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          console.log(
            chalk.red("  ✗ ") +
            chalk.dim(`Failed to install dependency "${dep}": `) +
            chalk.white(message)
          )
          console.log()
          return
        }
      }

      console.log()
    }
  }

  // ─── Main component ───────────────────────────────────────────────────────

  // Check if the main component already exists and prompt for overwrite
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

  try {
    await installComponent(componentName, component, targetDir, cwd, false)

    // Show npm dependencies if any
    if (component.dependencies && component.dependencies.length > 0) {
      console.log(
        chalk.blue("  ◆ ") +
        chalk.dim("This component requires npm packages: ") +
        chalk.white(component.dependencies.join(", "))
      )
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.log(chalk.red("  ✗ ") + chalk.dim(message))
  }

  console.log()
}
