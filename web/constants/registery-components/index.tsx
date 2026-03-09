export const registryComponents = [
  {
    name: "Text",
    command: "npx shellcn add text",
    preview: (
      <div className="flex flex-col gap-2 font-mono text-sm">
        <span className="font-bold">Bold Text</span>
        <span className="text-muted-foreground">Dimmed Text</span>
      </div>
    ),
    docs: {
      description: "Styled text component with colors and formatting.",
      import: 'import { Text } from "@/components/text"',
      example: `<Text color="green" bold>Success!</Text>\n<Text color="#FF5733">Custom hex color</Text>\n<Text dimmed>Loading...</Text>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Text content to display." },
        { name: "color", type: "Color", description: "Text color (named, hex, rgb)." },
        { name: "backgroundColor", type: "Color", description: "Background color." },
        { name: "bold", type: "boolean", description: "Render text in bold.", default: "false" },
        { name: "italic", type: "boolean", description: "Render text in italic.", default: "false" },
        { name: "dimmed", type: "boolean", description: "Dim the text (lower intensity).", default: "false" },
        { name: "underline", type: "boolean", description: "Add an underline to the text.", default: "false" },
        { name: "strikethrough", type: "boolean", description: "Add a strikethrough to the text.", default: "false" },
        { name: "inverse", type: "boolean", description: "Inverse background and foreground colors.", default: "false" },
        { name: "wrap", type: '"wrap" | "truncate" | "truncate-start" | "truncate-middle" | "truncate-end"', description: "Wrap text behavior." }
      ]
    }
  },
  {
    name: "Container",
    command: "npx shellcn add container",
    preview: (
      <div className="border border-border rounded-md p-4 text-center font-mono text-sm">
        A padded container
      </div>
    ),
    docs: {
      description: "A layout container for padding, margin, borders, and flexbox.",
      import: 'import { Container } from "@/components/container"',
      example: `<Container padding={1} radius="round" borderColor="cyan">\n  <Text>Hello, terminal!</Text>\n</Container>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Content inside the box." },
        { name: "width", type: "number | string", description: "Width of the box." },
        { name: "height", type: "number", description: "Height of the box in rows." },
        { name: "padding", type: "number", description: "Padding on all sides." },
        { name: "margin", type: "number", description: "Margin on all sides." },
        { name: "flexDirection", type: '"row" | "column" | "row-reverse" | "column-reverse"', description: "Flex direction.", default: '"column"' },
        { name: "alignItems", type: '"flex-start" | "flex-end" | "center" | "stretch"', description: "Align items along the cross axis." },
        { name: "justifyContent", type: '"flex-start" | "flex-end" | "center" | "space-between" | "space-around"', description: "Justify content along the main axis." },
        { name: "gap", type: "number", description: "Gap between children." },
        { name: "borderStyle", type: "BorderStyle", description: "Show border around the container." },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "borderColor", type: "string", description: "Border color." }
      ]
    }
  },
  {
    name: "Card",
    command: "npx shellcn add card",
    preview: (
      <div className="border border-border rounded-md p-3 flex flex-col gap-2 w-full bg-background font-mono text-xs">
        <div className="border-b border-border pb-1 font-bold">System Status</div>
        <div className="flex flex-col gap-0.5">
          <span>CPU: 42%</span>
          <span>RAM: 8.4GB</span>
        </div>
        <div className="text-[10px] text-muted-foreground pt-1 border-t border-border mt-1">
          Uptime: 2h 45m
        </div>
      </div>
    ),
    docs: {
      description: "A bordered container component for grouping related content, often used with Titles and Footers.",
      import: 'import { Card, CardTitle, CardFooter } from "@/components/card"',
      example: `<Card borderColor="cyan" radius="round">\n  <CardTitle color="cyan">System Info</CardTitle>\n  <Text>CPU: 45%</Text>\n  <Text>Memory: 2.1 GB</Text>\n  <CardFooter>Last updated: now</CardFooter>\n</Card>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Content of the card body." },
        { name: "radius", type: '"none" | "round"', description: "Border radius mapping to terminal styles.", default: '"none"' },
        { name: "borderColor", type: "string", description: "Color of the card's border.", default: '"white"' },
        { name: "paddingX", type: "number", description: "Horizontal padding.", default: "1" },
        { name: "flexDirection", type: '"row" | "column"', description: "Flex direction for content.", default: '"column"' }
      ]
    }
  },
  {
    name: "Alert",
    command: "npx shellcn add alert",
    preview: (
      <div className="border border-border rounded-md p-3 flex flex-col gap-1 w-full bg-background">
        <span className="font-bold text-sm">Warning</span>
        <span className="text-xs">Disk space is getting low.</span>
      </div>
    ),
    docs: {
      description: "Alert box component for displaying colored messages.",
      import: 'import { Alert } from "@/components/alert"',
      example: `<Alert variant="success" title="Done!">\n  All tasks completed successfully.\n</Alert>\n\n<Alert variant="error" radius="none">\n  Something went wrong.\n</Alert>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Content of the alert." },
        { name: "variant", type: '"info" | "success" | "warning" | "error"', description: "Visual variant of the alert.", default: '"info"' },
        { name: "title", type: "string", description: "Optional title displayed in bold above the message." },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "borderStyle", type: "string", description: "Optional manual override for border style." },
        { name: "color", type: "string", description: "Custom text color override." },
        { name: "borderColor", type: "string", description: "Custom border color override." }
      ]
    }
  },
  {
    name: "Progress",
    command: "npx shellcn add progress",
    preview: (
      <div className="flex items-center gap-2 w-full font-mono text-sm">
        <span>Build:</span>
        <div className="flex-1 bg-muted h-3 rounded-full overflow-hidden flex">
          <div className="bg-foreground w-[65%] h-full" />
        </div>
        <span>65%</span>
      </div>
    ),
    docs: {
      description: "Progress bar component for indicating completion percentage.",
      import: 'import { Progress } from "@/components/progress"',
      example: `<Progress value={0.65} color="green" showPercentage />\n<Progress value={0.3} width={40} fillChar="█" emptyChar="░" />`,
      props: [
        { name: "value", type: "number", description: "Current progress value between 0 and 1." },
        { name: "width", type: "number", description: "Total width of the progress bar.", default: "30" },
        { name: "fillChar", type: "string", description: "Character used for the filled portion.", default: '"█"' },
        { name: "emptyChar", type: "string", description: "Character used for the empty portion.", default: '"░"' },
        { name: "color", type: "string", description: "Color of the filled portion.", default: '"green"' },
        { name: "showPercentage", type: "boolean", description: "Show percentage label next to the bar.", default: "true" }
      ]
    }
  },
  {
    name: "Table",
    command: "npx shellcn add table",
    preview: (
      <div className="font-mono text-xs whitespace-pre">
        {`┌────────────┬────────┐
│ Name       │ Status │
├────────────┼────────┤
│ Node.js    │ Active │
│ React      │ Active │
└────────────┴────────┘`}
      </div>
    ),
    docs: {
      description: "Data table component with headers and borders.",
      import: 'import { Table } from "@/components/table"',
      example: `<Table\n  columns={[\n    { header: "Name", accessor: "name", width: 20 },\n    { header: "Status", accessor: "status", align: "center" },\n  ]}\n  data={[\n    { name: "Task 1", status: "done" },\n    { name: "Task 2", status: "pending" },\n  ]}\n/>`,
      props: [
        { name: "columns", type: "ColumnConfig[]", description: "Column definitions (header, accessor, width, align)." },
        { name: "data", type: "Record<string, string | number>[]", description: "Array of row data objects." },
        { name: "borderColor", type: "string", description: "Border color for the table frame.", default: '"gray"' },
        { name: "headerColor", type: "string", description: "Color of the header text.", default: '"white"' },
        { name: "cellColor", type: "string", description: "Color of the row text." },
        { name: "cellPadding", type: "number", description: "Add horizontal padding to each cell.", default: "1" }
      ]
    }
  },
  {
    name: "Input",
    command: "npx shellcn add input",
    preview: (
      <div className="flex items-center gap-2 font-mono text-sm border border-border px-3 py-2 w-full rounded-md">
        <span className="text-muted-foreground mr-2 border-r border-border pr-2">Email</span>
        <span className="animate-pulse">_</span>
      </div>
    ),
    docs: {
      description: "Text input component for capturing keyboard input.",
      import: 'import { Input } from "@/components/input"',
      example: `const [value, setValue] = useState("");\n\n<Input\n  label="Name:"\n  placeholder="Enter your name"\n  value={value}\n  onChange={setValue}\n  onSubmit={(v) => console.log("Submitted:", v)}\n/>`,
      props: [
        { name: "placeholder", type: "string", description: "Placeholder text shown when value is empty." },
        { name: "value", type: "string", description: "Current value of the input." },
        { name: "onChange", type: "(value: string) => void", description: "Called whenever the input value changes." },
        { name: "onSubmit", type: "(value: string) => void", description: "Called when the user presses Enter." },
        { name: "label", type: "string", description: "Label text displayed before the input." },
        { name: "mask", type: "string", description: "Character to show for password masking." },
        { name: "focus", type: "boolean", description: "Whether the input is focused.", default: "true" },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' }
      ]
    }
  },
  {
    name: "Select",
    command: "npx shellcn add select",
    preview: (
      <div className="flex flex-col gap-1 font-mono text-sm w-full">
        <span className="text-muted-foreground border-b border-border pb-1 mb-1">Select Fruit:</span>
        <span className="font-bold text-foreground">❯ Apple</span>
        <span className="text-muted-foreground">  Banana</span>
      </div>
    ),
    docs: {
      description: "Arrow-key select menu for choosing from a list of options.",
      import: 'import { Select } from "@/components/select"',
      example: `<Select\n  label="Choose a framework:"\n  options={[\n    { label: "React", value: "react" },\n    { label: "Vue", value: "vue" },\n    { label: "Svelte", value: "svelte" },\n  ]}\n  onSelect={(opt) => console.log("Selected:", opt.value)}\n/>`,
      props: [
        { name: "options", type: "SelectOption[]", description: "List of options to display." },
        { name: "onSelect", type: "(option: SelectOption) => void", description: "Called when the user selects an option." },
        { name: "onChange", type: "(option: SelectOption) => void", description: "Called when the highlighted option changes." },
        { name: "label", type: "string", description: "Label text displayed above the options." },
        { name: "indicator", type: "string", description: "Indicator character for the selected item.", default: '"❯"' },
        { name: "initialIndex", type: "number", description: "Index of the initially highlighted item.", default: "0" },
        { name: "focus", type: "boolean", description: "Whether the select is focused.", default: "true" }
      ]
    }
  },
  {
    name: "Checkbox",
    command: "npx shellcn add checkbox",
    preview: (
      <div className="flex flex-col gap-1 font-mono text-sm w-full">
        <span className="text-muted-foreground border-b border-border pb-1 mb-1">Options:</span>
        <span className="text-foreground">◉ ESLint</span>
        <span className="text-muted-foreground">○ Prettier</span>
      </div>
    ),
    docs: {
      description: "Multi-select checkbox list.",
      import: 'import { Checkbox } from "@/components/checkbox"',
      example: `<Checkbox\n  label="Select features:"\n  items={[\n    { label: "TypeScript", value: "ts", checked: true },\n    { label: "ESLint", value: "eslint" },\n  ]}\n  onSubmit={(selected) => console.log(selected)}\n/>`,
      props: [
        { name: "items", type: "CheckboxItem[]", description: "List of items to display." },
        { name: "onChange", type: "(items: CheckboxItem[]) => void", description: "Called whenever the checked state changes." },
        { name: "onSubmit", type: "(selected: CheckboxItem[]) => void", description: "Called when the user presses Enter." },
        { name: "label", type: "string", description: "Label text displayed above the checkbox list." },
        { name: "variant", type: '"rounded" | "square"', description: "Checkbox visual style.", default: '"square"' },
        { name: "focus", type: "boolean", description: "Whether the checkbox is focused and accepting input.", default: "true" }
      ]
    }
  },
  {
    name: "Separator",
    command: "npx shellcn add separator",
    preview: (
      <div className="flex flex-col items-center w-full gap-2 font-mono text-sm text-muted-foreground">
        <span>Above</span>
        <div className="w-full border-t border-border" />
        <span>Below</span>
      </div>
    ),
    docs: {
      description: "Visually separates content with a horizontal or vertical line.",
      import: 'import { Separator } from "@/components/separator"',
      example: `<Separator color="magenta" />\n<Separator orientation="vertical" color="cyan" />`,
      props: [
        { name: "color", type: "string", description: "Color of the separator.", default: '"gray"' },
        { name: "orientation", type: '"horizontal" | "vertical"', description: "Orientation of the separator.", default: '"horizontal"' }
      ]
    }
  }
]