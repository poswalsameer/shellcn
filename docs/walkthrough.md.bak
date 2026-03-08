# shellcn — Walkthrough

## What Was Built

A complete terminal UI component ecosystem inspired by shadcn/ui, built on **Ink** + **TypeScript**.

### Project Structure

```
shellcn/
├── package.json              # Monorepo root with workspaces
├── tsconfig.json             # Base TypeScript config (strict, JSX, ES2020)
├── packages/
│   ├── cli/                  # CLI tool (shellcn)
│   │   ├── src/
│   │   │   ├── index.ts            # Commander.js entry point
│   │   │   ├── commands/
│   │   │   │   ├── init.ts         # shellcn init
│   │   │   │   ├── add.ts          # shellcn add <component>
│   │   │   │   └── list.ts         # shellcn list
│   │   │   ├── utils/
│   │   │   │   ├── registry.ts     # Load & parse components.json
│   │   │   │   ├── downloader.ts   # Copy templates to user project
│   │   │   │   └── project.ts      # Package manager detection, config R/W
│   │   │   └── config/
│   │   │       └── defaults.ts     # Constants (paths, file names)
│   │   ├── tsup.config.ts          # Bundle config with shebang
│   │   └── package.json
│   └── registry/
│       ├── components.json         # Registry manifest (10 components)
│       └── components/
│           ├── text.tsx    ├── box.tsx      ├── spinner.tsx
│           ├── progress.tsx├── table.tsx    ├── input.tsx
│           ├── select.tsx  ├── checkbox.tsx ├── alert.tsx
│           └── card.tsx
└── examples/
    ├── dev-playground/       # Live preview of ALL 10 components
    ├── demo-chat/            # AI Chat CLI example
    └── demo-task-manager/    # Task Manager CLI example
```

---

## Verification Results

### Build

- `npm install` — **109 packages, 0 vulnerabilities**
- `npm run build` — tsup produced `dist/index.js` (9.19 KB) in **21ms**

### CLI Commands

**`shellcn list`** — Lists all 10 components with descriptions:

```
  Name        Description
  ──────────────────────────────────────────
  text        Styled text with color, bold, dim, underline, ...
  box         Layout container with padding, margin, border, ...
  spinner     Animated loading spinner with customizable frames ...
  ...         (10 total)
```

**`shellcn init`** — Initializes a project:

```
  ✓ Created components directory: src/components/shellcn
  ✓ Created config file: shellcn.config.json
  ✓ Installed: ink, react
  ✓ shellcn initialized successfully!
```

**`shellcn add spinner`** — Copies component into user project:

```
  ✓ Added spinner → .\src\components\shellcn\spinner.tsx
```

---

## Dev Environment

### Live Component Preview

Run the dev playground to see all 10 components rendered in your terminal:

```bash
npm run dev:preview
```

This uses `tsx watch` for hot-reload — edit any component in `packages/registry/components/` and see changes instantly.

### Example Apps

```bash
npm run dev:chat     # AI Chat CLI (Input, Card, Spinner)
npm run dev:tasks    # Task Manager (Checkbox, Progress, Alert)
```

---

## The 10 Components

| Component    | Key Features                                                |
| ------------ | ----------------------------------------------------------- |
| **Text**     | color, bold, italic, dim, underline, strikethrough          |
| **Box**      | padding, margin, border, flexDirection, gap                 |
| **Spinner**  | 5 presets (dots/line/arc/bounce/circle), custom frames      |
| **Progress** | fill/empty chars, percentage, label, color                  |
| **Table**    | column config, alignment (left/right/center), auto-width    |
| **Input**    | placeholder, controlled/uncontrolled, password mask, cursor |
| **Select**   | arrow-key navigation, highlight, indicator character        |
| **Checkbox** | space toggle, enter confirm, multi-select                   |
| **Alert**    | 4 variants (info/success/warning/error), icons, title       |
| **Card**     | title, footer, configurable border and padding              |
