# shellcn — Complete Codebase Guide

A file-by-file breakdown of every single file in the shellcn project, starting from the root and working inward.

---

## Table of Contents

- [Root Files (Project Foundation)](#root-files-project-foundation)
- [CLI Package — packages/cli/](#cli-package--packagescli)
- [Component Registry — packages/registry/](#component-registry--packagesregistry)
- [Example Apps — examples/](#example-apps--examples)

---

## Root Files (Project Foundation)

These files set up the entire monorepo — they tell npm how the project is organized and TypeScript how to compile everything.

### `package.json` — The Monorepo Root

```json
{
  "workspaces": ["packages/*", "examples/*"]
}
```

**What it does:**

- Declares this as a **monorepo** using npm workspaces
- `"workspaces": ["packages/*", "examples/*"]` tells npm that every folder inside `packages/` and `examples/` is its **own sub-project** with its own `package.json`
- When you run `npm install` at the root, npm installs dependencies for **ALL** sub-projects at once and links them together
- Defines 4 scripts:
  - `build` → builds the CLI tool using tsup
  - `dev:preview` → runs the dev playground (all components)
  - `dev:chat` → runs the chat demo
  - `dev:tasks` → runs the task manager demo

### `tsconfig.json` — Base TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

**What it does:**

- This is the **base** TypeScript configuration that every sub-project extends
- `"target": "ES2020"` — compile to modern JavaScript (supports async/await natively)
- `"module": "ESNext"` — use ES module `import/export` syntax
- `"jsx": "react-jsx"` — enables JSX/TSX support (needed for Ink components)
- `"strict": true` — enforces strict type checking (no `any`, null checks, etc.)
- `"moduleResolution": "bundler"` — use modern module resolution that works with bundlers like tsup
- Every sub-project's `tsconfig.json` says `"extends": "../../tsconfig.json"` to inherit these settings

---

## CLI Package — `packages/cli/`

This is the **brain of shellcn** — the command-line tool that users interact with. When someone runs `npx shellcn init` or `npx shellcn add spinner`, this is the code that executes.

### `packages/cli/package.json` — CLI Package Manifest

**What it does:**

- Names the package `"shellcn"` — this is what gets published to npm
- `"bin": { "shellcn": "dist/index.js" }` — this is the **magic line** that makes `npx shellcn` work. It tells npm "when someone types `shellcn` in their terminal, run `dist/index.js`"
- `"type": "module"` — use ES modules (import/export) instead of CommonJS (require)
- Lists 3 runtime dependencies:
  - **commander** — framework for building CLI commands (handles argument parsing, help text, etc.)
  - **chalk** — makes terminal output colorful (green ✓, red ✗, cyan text, etc.)
  - **fs-extra** — enhanced file system operations (like `ensureDir` that creates nested folders)

### `packages/cli/tsconfig.json` — CLI TypeScript Config

**What it does:**

- `"extends": "../../tsconfig.json"` — inherits everything from the root config
- `"rootDir": "src"` — TypeScript source code lives in `src/`
- `"outDir": "dist"` — compiled JavaScript goes to `dist/`

### `packages/cli/tsup.config.ts` — Build Configuration

```typescript
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  banner: { js: "#!/usr/bin/env node" },
})
```

**What it does:**

- **tsup** is a fast TypeScript bundler (builds your TS into runnable JS)
- `entry: ["src/index.ts"]` — start bundling from the main entry file
- `format: ["esm"]` — output ES module format
- `banner: { js: "#!/usr/bin/env node" }` — this is critical! It adds a **shebang line** (`#!/usr/bin/env node`) at the top of the output file. This tells the operating system "run this file with Node.js" when someone types `shellcn` in their terminal
- `target: "node18"` — optimize for Node.js 18+
- `clean: true` — delete old `dist/` files before each build

---

### CLI Source Code — `packages/cli/src/`

This is where all the actual CLI logic lives. Let's go through it layer by layer, from the foundation up.

---

### `src/config/defaults.ts` — Constants

```typescript
export const DEFAULT_COMPONENTS_PATH = "src/components/shellcn"
export const CONFIG_FILE_NAME = "shellcn.config.json"
```

**What it does:**

- Defines **all the magic strings** used throughout the CLI in one place
- `DEFAULT_COMPONENTS_PATH` — where components get installed in the user's project
- `CONFIG_FILE_NAME` — the config file name (`shellcn.config.json`)
- `REQUIRED_DEPENDENCIES` — packages that shellcn needs (`ink`, `react`)
- `VERSION` — current version of shellcn

**Why it exists:** If you ever want to change where components are installed, you change ONE file instead of hunting through the entire codebase.

---

### `src/utils/project.ts` — Project Detection Utilities

**What it does:**
This file answers the question: "What kind of project are we working in?"

Three key functions:

1. **`detectPackageManager(cwd)`**
   - Checks for lock files to figure out if the user uses npm, yarn, or pnpm
   - Looks for `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, otherwise → npm
   - Used by the `init` command to know which install command to run

2. **`readConfig(cwd)`**
   - Reads the `shellcn.config.json` file from the user's project
   - Returns `null` if the file doesn't exist (means shellcn isn't initialized)
   - Used by the `add` command to know where to put components

3. **`writeConfig(cwd, config)`**
   - Writes the `shellcn.config.json` file
   - Used by the `init` command

4. **`resolveComponentsDir(cwd, config)`**
   - Combines the user's project path with the configured components path
   - Example: `/my-project` + `src/components/shellcn` → `/my-project/src/components/shellcn`

---

### `src/utils/registry.ts` — Registry Access

**What it does:**
This file is the bridge between the CLI and the component templates. It reads and parses the `components.json` manifest.

Key functions:

1. **`getRegistryDir()`** (private)
   - Figures out where the registry folder is on disk
   - Uses `import.meta.url` to find where the current file is, then navigates up to `packages/registry/`
   - This is tricky because when tsup bundles the code, the file moves from `src/utils/` to `dist/`, so the relative path changes

2. **`loadRegistry()`**
   - Reads `components.json` and returns the full registry object
   - Throws an error if the file doesn't exist

3. **`getComponent(name)`**
   - Looks up a single component by name (e.g., `"spinner"`)
   - Returns the component entry or `null`

4. **`listComponents()`**
   - Returns an array of all component names

5. **`resolveComponentPath(componentPath)`**
   - Converts a relative registry path (e.g., `"components/spinner.tsx"`) to an absolute file path

---

### `src/utils/downloader.ts` — File Copier

**What it does:**
Despite the name "downloader", this file **copies** component templates from the registry into the user's project. (It's called "downloader" because in a future version, it could fetch from a remote URL.)

Two functions:

1. **`downloadComponent(componentPath, targetDir)`**
   - Takes the registry path and the user's components directory
   - Copies the `.tsx` file from the registry to the user's project
   - Creates any missing directories along the way (`ensureDir`)

2. **`componentExists(componentPath, targetDir)`**
   - Checks if a component file already exists in the user's project
   - Used by the `add` command to ask "Do you want to overwrite?"

---

### `src/commands/init.ts` — The `shellcn init` Command

**What it does when you run `npx shellcn init`:**

1. Prints a header: `shellcn — Terminal UI Components`
2. Checks if already initialized (looks for `shellcn.config.json`)
3. Creates the components directory: `src/components/shellcn/`
4. Writes the config file: `shellcn.config.json` with `{ "componentsPath": "src/components/shellcn" }`
5. Detects the package manager (npm/yarn/pnpm)
6. Runs the install command (e.g., `npm install ink react`)
7. Prints success message with next steps

---

### `src/commands/add.ts` — The `shellcn add <component>` Command

**What it does when you run `npx shellcn add spinner`:**

1. Reads the project config (ensures shellcn is initialized)
2. Looks up `"spinner"` in the registry
3. If the component doesn't exist in the registry → error message
4. If the component file already exists in the user's project → asks "Overwrite? [y/N]"
5. Copies the component template into `src/components/shellcn/spinner.tsx`
6. Prints success message and any extra dependencies needed

The `confirm()` helper function creates a simple yes/no prompt using Node's `readline` module.

---

### `src/commands/list.ts` — The `shellcn list` Command

**What it does when you run `npx shellcn list`:**

1. Loads the full registry
2. Calculates column widths for nice alignment
3. Prints a formatted table with component names and descriptions
4. Shows the "add a component" hint at the bottom

---

### `src/index.ts` — CLI Entry Point

```typescript
const program = new Command()
program.name("shellcn").version(VERSION)
program.command("init").action(initCommand)
program.command("add").argument("<component>").action(addCommand)
program.command("list").action(listCommand)
program.parse()
```

**What it does:**

- This is the **first file that runs** when someone types `shellcn` in their terminal
- Uses **Commander.js** to define the CLI structure
- Registers 3 commands: `init`, `add`, `list`
- `program.parse()` reads the command-line arguments and routes to the right command handler
- Commander automatically generates `--help` and `--version` flags

---

## Component Registry — `packages/registry/`

This is the **library of component templates**. When a user runs `shellcn add spinner`, the CLI reads from this folder and copies the component into their project.

### `packages/registry/components.json` — The Manifest

```json
{
  "components": {
    "spinner": {
      "path": "components/spinner.tsx",
      "description": "Animated loading spinner with customizable frames and label"
    }
  }
}
```

**What it does:**

- This is the **registry index** — the master list of all available components
- Each entry has a `path` (where to find the template file) and a `description` (shown in `shellcn list`)
- The CLI reads this file to know what components exist and where to find them
- Currently lists all 10 components

---

### Component Files — `packages/registry/components/*.tsx`

All 10 components follow the **same pattern**:

```
1. Import React and Ink primitives
2. Define a Props interface (TypeScript types for all customizable options)
3. Export a named React component
4. Use Ink's primitives (<Text>, <Box>, useInput) internally
5. Export as default too
```

Let me explain each one:

---

### `components/text.tsx` — Styled Text

**Purpose:** Display text with styling (color, bold, dim, underline, strikethrough).

**How it works:**

- Wraps Ink's `<Text>` component with a cleaner prop interface
- Maps props like `dimmed` → Ink's `dimColor`, keeping the API intuitive
- Every visual property is optional with sensible defaults

**Example usage:**

```tsx
<Text color="green" bold>Success!</Text>
<Text dimmed>Loading...</Text>
```

---

### `components/box.tsx` — Layout Container

**Purpose:** Create layouts with padding, margins, borders, and flexbox.

**How it works:**

- Wraps Ink's `<Box>` with convenience props like `paddingX`, `paddingY`, `marginX`, `marginY`
- Ink's Box uses flexbox by default (like CSS), so you get `flexDirection`, `alignItems`, `justifyContent`, `gap`
- `borderStyle` accepts values like `"round"`, `"double"`, `"bold"`, etc.

**Example usage:**

```tsx
<Box padding={1} borderStyle="round" borderColor="cyan">
  <Text>Inside a bordered box</Text>
</Box>
```

---

### `components/spinner.tsx` — Loading Spinner

**Purpose:** Show an animated loading indicator.

**How it works:**

- Has 5 built-in frame sets: `dots` (⠋⠙⠹...), `line` (-\|/), `arc` (◜◠◝...), `bounce`, `circle`
- Uses `useState` + `useEffect` with `setInterval` to cycle through frames
- The interval timer advances the frame index, React re-renders the component with the new frame
- Accepts custom frames too (`frames={["🌑", "🌒", "🌓"]}`)

**Example usage:**

```tsx
<Spinner label="Loading..." color="cyan" />
```

---

### `components/progress.tsx` — Progress Bar

**Purpose:** Display a horizontal progress bar.

**How it works:**

- Takes a `value` between 0 and 1 (e.g., 0.65 = 65%)
- Calculates how many `fillChar` (█) and `emptyChar` (░) characters to show based on the `width`
- Clamps the value so it never goes below 0 or above 1
- Optionally shows the percentage as text

**Example usage:**

```tsx
<Progress value={0.65} color="green" showPercentage />
```

---

### `components/table.tsx` — Data Table

**Purpose:** Render tabular data with headers, borders, and column alignment.

**How it works:**

- Takes `columns` (configuration) and `data` (array of objects)
- Each column config specifies: `header`, `accessor` (which key to read from data), `width`, and `align`
- Auto-calculates column widths if not specified (based on longest content)
- The `alignText()` helper pads/truncates strings to fixed widths with left/right/center alignment
- Draws box-drawing characters (┌─┐│├┤└─┘) for borders

**Example usage:**

```tsx
<Table
  columns={[{ header: "Name", accessor: "name", width: 20 }]}
  data={[{ name: "Alice" }, { name: "Bob" }]}
/>
```

---

### `components/input.tsx` — Text Input

**Purpose:** Capture keyboard input from the user.

**How it works:**

- Uses Ink's `useInput` hook to listen for keystrokes
- Supports both **controlled** (parent passes `value`) and **uncontrolled** (manages own `internalValue`) modes
- Handles backspace (remove last char), Enter (call `onSubmit`), and regular character input
- Ignores control keys, arrow keys, tab, escape
- Shows a cursor character (▋) when focused
- Supports password masking via `mask` prop

**Example usage:**

```tsx
const [name, setName] = useState("")
;<Input label="Name:" value={name} onChange={setName} onSubmit={handleSubmit} />
```

---

### `components/select.tsx` — Select Menu

**Purpose:** Arrow-key navigable single-select dropdown.

**How it works:**

- Takes an array of `options` (each with `label` and `value`)
- Tracks `highlightedIndex` with `useState`
- Uses `useInput` to listen for up/down arrows and Enter
- Wraps around (going up from first item goes to last)
- Shows an indicator character (❯) next to the highlighted option
- Highlighted option is **bold** and **colored**

**Example usage:**

```tsx
<Select
  options={[
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
  ]}
  onSelect={(opt) => console.log(opt.value)}
/>
```

---

### `components/checkbox.tsx` — Multi-Select Checkbox

**Purpose:** Multi-select list where you toggle items on/off.

**How it works:**

- Similar to Select but tracks **checked state** for each item independently
- Up/down arrows navigate, **Space** toggles check, **Enter** confirms
- Uses `◉` for checked and `○` for unchecked (customizable)
- Checked items turn green, focused item gets the highlight color
- Shows a keyboard hint at the bottom

**Example usage:**

```tsx
<Checkbox
  items={[
    { label: "TypeScript", value: "ts", checked: true },
    { label: "ESLint", value: "eslint" },
  ]}
  onSubmit={(selected) => console.log(selected)}
/>
```

---

### `components/alert.tsx` — Alert Box

**Purpose:** Display info/success/warning/error messages with icons.

**How it works:**

- Has 4 variants, each with a preset icon and color:
  - `info` → ℹ blue
  - `success` → ✓ green
  - `warning` → ⚠ yellow
  - `error` → ✗ red
- Wraps content in a bordered `<Box>` with the variant's border color
- Optional `title` shown in bold above the message
- Custom icons can override the defaults

**Example usage:**

```tsx
<Alert variant="success" title="Done!">
  All tasks completed.
</Alert>
```

---

### `components/card.tsx` — Card Container

**Purpose:** A bordered container with optional title and footer.

**How it works:**

- Takes `children` (the card body content)
- Optional `title` rendered in bold at the top with a margin below
- Optional `footer` rendered dimmed at the bottom with a margin above
- Customizable border style, border color, padding

**Example usage:**

```tsx
<Card title="System Info" footer="Updated just now" borderColor="cyan">
  <Text>CPU: 45%</Text>
</Card>
```

---

## Example Apps — `examples/`

Each example app has 3 files: `package.json`, `tsconfig.json`, and `index.tsx`.

The `package.json` files are identical — they declare `ink` and `react` as dependencies and have a `dev` script using `tsx watch`.

The `tsconfig.json` files extend the root config and include the registry components path so TypeScript doesn't complain about imports from `../../packages/registry/`.

---

### `examples/dev-playground/index.tsx` — Component Gallery

**Purpose:** Renders ALL 10 components in a single terminal view for development preview.

**How it works:**

- Imports every component directly from `../../packages/registry/components/`
- Creates a `<Section>` wrapper component that labels each preview with a magenta title
- The Progress bar **animates** using `useState` + `useEffect` (increments by 0.02 every 100ms, resets at 1)
- Input and Select have `focus={false}` so they don't capture keystrokes (since they're just previews)
- `render(<App />)` at the bottom is Ink's equivalent of `ReactDOM.render()` — it mounts the React component into the terminal

---

### `examples/demo-chat/index.tsx` — AI Chat Demo

**Purpose:** Simulates an AI chat interface using shellcn components.

**How it works:**

- Maintains a `messages` array in state, each with `role` ("user" | "assistant") and `content`
- When the user types a message and hits Enter:
  1. Adds the user message immediately
  2. Sets `isThinking = true` (shows a Spinner)
  3. After 1.5 seconds, picks a random AI response and adds it
  4. Sets `isThinking = false`
- Messages are rendered as `<Card>` components — blue border for user, green for AI
- Input is disabled while the AI is "thinking"
- Typing `"quit"` calls `exit()` from Ink's `useApp` hook

---

### `examples/demo-task-manager/index.tsx` — Task Manager Demo

**Purpose:** Shows a task list with checkboxes, progress tracking, and feedback alerts.

**How it works:**

- Starts with 7 predefined tasks (3 checked, 4 unchecked)
- Progress bar automatically reflects `completedCount / totalCount`
- When you toggle a checkbox, `handleChange` updates the task list and sets a `lastAction` message
- The Alert at the bottom shows what you just did ("✓ Completed: ..." or "○ Unchecked: ...")
- When all tasks are complete, a special "🎉 All Done!" alert appears
- Press `q` to quit

---

## How Everything Connects

```
User types: npx shellcn add spinner
     │
     ▼
packages/cli/dist/index.js        ← shebang makes this executable
     │
     ▼
src/index.ts                       ← Commander parses "add spinner"
     │
     ▼
src/commands/add.ts                ← addCommand("spinner") runs
     │
     ├── src/utils/project.ts      ← reads shellcn.config.json
     ├── src/utils/registry.ts     ← looks up "spinner" in components.json
     └── src/utils/downloader.ts   ← copies spinner.tsx to user's project
           │
           ▼
packages/registry/components.json  ← finds { path: "components/spinner.tsx" }
           │
           ▼
packages/registry/components/spinner.tsx  ← source template
           │
           ▼
user-project/src/components/shellcn/spinner.tsx  ← installed! ✓
```
