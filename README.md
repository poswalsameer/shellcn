# shellcn

**Terminal UI component system for [Ink](https://github.com/vadimdemedes/ink) — inspired by [shadcn/ui](https://ui.shadcn.com/)**

Build beautiful and interactive command-line interfaces with React. `shellcn` provides a collection of re-usable, customizable terminal UI components that you can copy and paste into your Ink apps.

**This is NOT a component library you install via npm as a dependency.** Instead, it is a collection of CLI commands that download the underlying source code of the components directly into your project. You have full ownership and control over the code.

## Why shellcn?

- **Ownership**: The component source code lives in your project. You can modify it, style it, and adapt it to your needs.
- **Ink-based**: Built on top of the awesome [Ink](https://github.com/vadimdemedes/ink) library for React-based CLI apps.
- **Developer Experience**: Modern terminal features (flexbox layouts, colors, interactive inputs) accessible via simple React primitives.

## Quick Start

### 1. Initialize shellcn in your project

Run the `init` command to set up `shellcn` in your Ink project. This will create a `components.json` configuration file and ask you where you'd like your components to reside.

```bash
npx shellcn-tui init
```

### 2. Available Components

You can explore the list of components that are ready to be integrated into your project by running:

```bash
npx shellcn-tui list
```

### 3. Add Components

Add any component to your project using the `add` command. For example, to add a beautiful stylized `card` component:

```bash
npx shellcn-tui add card
```

When you run this command:

1. `shellcn` downloads `card.tsx` to your configured components directory.
2. It lists any dependencies this component may require.

### Usage Example

After adding the `alert` and `text` components, you can use them exactly like regular React components in your CLI:

```tsx
import React from "react"
import { render } from "ink"
import { Alert } from "./components/alert"
import { Text } from "./components/text"

const App = () => (
  <Alert variant="success" title="Deployment Successful">
    <Text dim>Your shellcn application has been deployed.</Text>
  </Alert>
)

render(<App />)
```

## Available Components

Here is the current list of components offered by `shellcn`:

- **`alert`**: Alert box with info, success, warning, and error variants
- **`card`**: Bordered card container with optional title and footer
- **`checkbox`**: Multi-select checkbox list with toggle support
- **`container`**: Layout container with padding, margin, border, and flex
- **`input`**: Text input with placeholder, onChange, and onSubmit
- **`progress`**: Progress bar with percentage display and customizable fill
- **`select`**: Arrow-key select menu with highlight styling
- **`separator`**: Visually or semantically separates content
- **`table`**: Data table with headers, column alignment, and borders
- **`text`**: Styled text with color, bold, dim, underline, and strikethrough support

## License

MIT License.
