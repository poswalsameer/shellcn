import { Command } from "commander"
import { VERSION } from "./config/defaults.js"
import { addCommand } from "./commands/add.js"
import { initCommand } from "./commands/init.js"
import { listCommand } from "./commands/list.js"

/** shellcn CLI — Terminal UI component system inspired by shadcn/ui. */
const program = new Command()

program
  .name("shellcn")
  .description("Terminal UI component system for Ink — inspired by shadcn/ui")
  .version(VERSION)

program
  .command("init")
  .description("Initialize shellcn in your project")
  .action(async () => {
    await initCommand()
  })

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "Name of the component to add")
  .action(async (component: string) => {
    await addCommand(component)
  })

program
  .command("list")
  .description("List all available components")
  .action(async () => {
    await listCommand()
  })

program.parse()
