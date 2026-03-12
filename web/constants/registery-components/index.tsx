import React from "react"
import { AlertPreview, CardPreview, CheckboxPreview, ContainerPreview, InputPreview, ProgressPreview, SelectPreview, SeparatorPreview, TablePreview, TextPreview } from "@/components/components-section/preview-components"



export const registryComponents = [

  // PROGRESS
  {
    name: "Progress",
    command: "npx shellcn add progress",
    preview: <ProgressPreview />,
    docs: {
      description: "Progress bar component for indicating completion percentage.",
      import: 'import { Progress } from "@/components/progress"',
      example: `<Progress value={0.65} color="green" showPercentage />\n<Progress value={0.3} width={40} fillChar="█" emptyChar="░" />`,
      props: [
        { name: "value", type: "number", description: "Progress value between 0 and 1." },
        { name: "width", type: "number", description: "Total width in columns.", default: "30" },
        { name: "fillChar", type: "string", description: "Filled portion character.", default: '"█"' },
        { name: "emptyChar", type: "string", description: "Empty portion character.", default: '"░"' },
        { name: "color", type: "string", description: "Fill color.", default: '"green"' },
        { name: "emptyColor", type: "string", description: "Color of the empty portion.", default: '"gray"' },
        { name: "showPercentage", type: "boolean", description: "Show percentage label.", default: "true" },
        { name: "textColor", type: "string", description: "Color of the percentage text.", default: '"white"' },
      ]
    }
  },

  // CONTAINER 
  {
    name: "Container",
    command: "npx shellcn add container",
    preview: <ContainerPreview />,
    docs: {
      description: "A layout container for padding, margin, borders, and flexbox.",
      import: 'import { Container } from "@/components/container"',
      example: `<Container padding={1} radius="round" borderColor="cyan">\n  <Text>Hello, terminal!</Text>\n</Container>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Content inside the box." },
        { name: "width", type: "number | string", description: "Width of the box." },
        { name: "height", type: "number", description: "Height of the box in rows." },
        { name: "padding", type: "number", description: "Padding on all sides." },
        { name: "paddingX", type: "number", description: "Horizontal padding." },
        { name: "paddingY", type: "number", description: "Vertical padding." },
        { name: "paddingLeft", type: "number", description: "Left padding." },
        { name: "paddingRight", type: "number", description: "Right padding." },
        { name: "paddingTop", type: "number", description: "Top padding." },
        { name: "paddingBottom", type: "number", description: "Bottom padding." },
        { name: "margin", type: "number", description: "Margin on all sides." },
        { name: "marginX", type: "number", description: "Horizontal margin." },
        { name: "marginY", type: "number", description: "Vertical margin." },
        { name: "marginLeft", type: "number", description: "Left margin." },
        { name: "marginRight", type: "number", description: "Right margin." },
        { name: "marginTop", type: "number", description: "Top margin." },
        { name: "marginBottom", type: "number", description: "Bottom margin." },
        { name: "flexDirection", type: '"row" | "column" | "row-reverse" | "column-reverse"', description: "Flex direction.", default: '"column"' },
        { name: "alignItems", type: '"flex-start" | "flex-end" | "center" | "stretch"', description: "Cross-axis alignment." },
        { name: "justifyContent", type: '"flex-start" | "flex-end" | "center" | "space-between" | "space-around"', description: "Main-axis alignment." },
        { name: "gap", type: "number", description: "Gap between children." },
        { name: "borderStyle", type: "BorderStyle", description: "Border style." },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "borderColor", type: "string", description: "Border color." },
      ]
    }
  },

  // CARD
  {
    name: "Card",
    command: "npx shellcn add card",
    preview: <CardPreview />,
    docs: {
      description: "A bordered container component for grouping related content, often used with Titles and Footers.",
      import: 'import { Card, CardTitle, CardFooter } from "@/components/card"',
      example: `<Card borderColor="cyan" radius="round">\n  <CardTitle color="cyan">System Info</CardTitle>\n  <Text>CPU: 45%</Text>\n  <CardFooter>Last updated: now</CardFooter>\n</Card>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Content of the card body." },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "borderColor", type: "string", description: "Border color.", default: '"white"' },
        { name: "paddingX", type: "number", description: "Horizontal padding.", default: "1" },
        { name: "Other Container Props", type: "ContainerProps", description: "This component also accepts all standard Container properties (like padding, margin, flex, etc)." },
        { name: "CardTitle Props", type: "TextProps", description: "The <CardTitle> subcomponent accepts all standard Text properties (like color, dim, underline, etc)." },
        { name: "CardFooter Props", type: "TextProps", description: "The <CardFooter> subcomponent accepts all standard Text properties." },
      ]
    }
  },

  // ALERT
  {
    name: "Alert",
    command: "npx shellcn add alert",
    preview: <AlertPreview />,
    docs: {
      description: "Alert box component for displaying colored messages.",
      import: 'import { Alert } from "@/components/alert"',
      example: `<Alert variant="success" title="Done!">\n  All tasks completed successfully.\n</Alert>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Content of the alert." },
        { name: "variant", type: '"info" | "success" | "warning" | "error"', description: "Visual variant.", default: '"info"' },
        { name: "title", type: "string", description: "Optional title displayed above the message." },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "borderStyle", type: '"single" | "double" | "round" | "bold" | "classic"', description: "Optional manual override for border style." },
        { name: "color", type: "string", description: "Custom text color override." },
        { name: "borderColor", type: "string", description: "Custom border color override." },
        { name: "flexDirection", type: '"row" | "column" | "row-reverse" | "column-reverse"', description: "Flex direction.", default: '"column"' },
        { name: "alignItems", type: '"flex-start" | "flex-end" | "center" | "stretch"', description: "Cross-axis alignment." },
        { name: "justifyContent", type: '"flex-start" | "flex-end" | "center" | "space-between" | "space-around"', description: "Main-axis alignment." },
      ]
    }
  },

  // TEXT
  {
    name: "Text",
    command: "npx shellcn add text",
    preview: <TextPreview />,
    docs: {
      description: "Styled text component with colors and formatting.",
      import: 'import { Text } from "@/components/text"',
      example: `<Text color="green" bold>Success!</Text>\n<Text color="#FF5733">Custom hex color</Text>\n<Text dimmed>Loading...</Text>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Text content to display." },
        { name: "color", type: "Color", description: "Text color (named, hex, rgb)." },
        { name: "backgroundColor", type: "Color", description: "Background color (named, hex, rgb)." },
        { name: "bold", type: "boolean", description: "Render text in bold.", default: "false" },
        { name: "italic", type: "boolean", description: "Render text in italic.", default: "false" },
        { name: "dimmed", type: "boolean", description: "Dim the text (lower intensity).", default: "false" },
        { name: "underline", type: "boolean", description: "Add an underline to the text.", default: "false" },
        { name: "strikethrough", type: "boolean", description: "Add a strikethrough to the text.", default: "false" },
        { name: "inverse", type: "boolean", description: "Inverse background and foreground colors.", default: "false" },
        { name: "wrap", type: '\"wrap\" | \"truncate\" | \"truncate-start\" | \"truncate-middle\" | \"truncate-end\"', description: "Wrap text behavior." },
      ]
    }
  },

  // TABLE 
  {
    name: "Table",
    command: "npx shellcn add table",
    preview: <TablePreview />,
    docs: {
      description: "Data table component with headers and borders.",
      import: 'import { Table } from "@/components/table"',
      example: `<Table\n  columns={[{ header: "Name", accessor: "name", width: 20 }]}\n  data={[{ name: "Task 1" }]}\n/>`,
      props: [
        { name: "columns", type: "ColumnConfig[]", description: "Column definitions." },
        { name: "data", type: "Record<string, string | number>[]", description: "Row data." },
        { name: "borderColor", type: "string", description: "Border color.", default: '"gray"' },
        { name: "headerColor", type: "string", description: "Header text color.", default: '"white"' },
        { name: "cellColor", type: "string", description: "Cell text color." },
        { name: "cellPadding", type: "number", description: "Horizontal cell padding.", default: "1" },
      ]
    }
  },

  // INPUT 
  {
    name: "Input",
    command: "npx shellcn add input",
    preview: <InputPreview />,
    docs: {
      description: "Text input component for capturing keyboard input.",
      import: 'import { Input } from "@/components/input"',
      example: `<Input label="Name:" placeholder="Enter your name" value={value} onChange={setValue} />`,
      props: [
        { name: "value", type: "string", description: "Current value (controlled)." },
        { name: "onChange", type: "(value: string) => void", description: "Called on value change." },
        { name: "onSubmit", type: "(value: string) => void", description: "Called on Enter." },
        { name: "label", type: "string", description: "Label shown before input." },
        { name: "placeholder", type: "string", description: "Placeholder when empty." },
        { name: "mask", type: "string", description: "Password masking character." },
        { name: "focus", type: "boolean", description: "Whether input is focused.", default: "true" },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "labelColor", type: "string", description: "Color of the label text." },
        { name: "borderColor", type: "string", description: "Color of the border." },
        { name: "textColor", type: "string", description: "Color of the input text." },
        { name: "placeholderColor", type: "string", description: "Color of the placeholder text." },
      ]
    }
  },

  // SELECT 
  {
    name: "Select",
    command: "npx shellcn add select",
    preview: <SelectPreview />,
    docs: {
      description: "Arrow-key select menu for choosing from a list of options.",
      import: 'import { Select } from "@/components/select"',
      example: `<Select\n  label="Choose a framework:"\n  options={[{ label: "React", value: "react" }]}\n  onSelect={(opt) => console.log(opt.value)}\n/>`,
      props: [
        { name: "options", type: "SelectOption[]", description: "List of options." },
        { name: "onSelect", type: "(option: SelectOption) => void", description: "Called on selection." },
        { name: "onChange", type: "(option: SelectOption) => void", description: "Called when the highlighted option changes." },
        { name: "label", type: "string", description: "Label above options." },
        { name: "indicator", type: "string", description: "Active item indicator.", default: '"❯"' },
        { name: "highlightColor", type: "string", description: "Color of the active item.", default: '"cyan"' },
        { name: "initialIndex", type: "number", description: "Initially highlighted index.", default: "0" },
        { name: "focus", type: "boolean", description: "Whether select is focused.", default: "true" },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "labelColor", type: "string", description: "Color of the label text." },
        { name: "borderColor", type: "string", description: "Color of the border." },
        { name: "textColor", type: "string", description: "Color of the unhighlighted option text." },
      ]
    }
  },

  // CHECKBOX 
  {
    name: "Checkbox",
    command: "npx shellcn add checkbox",
    preview: <CheckboxPreview />,
    docs: {
      description: "Multi-select checkbox list.",
      import: 'import { Checkbox } from "@/components/checkbox"',
      example: `<Checkbox\n  label="Select features:"\n  items={[{ label: "TypeScript", value: "ts", checked: true }]}\n  onSubmit={(selected) => console.log(selected)}\n/>`,
      props: [
        { name: "items", type: "CheckboxItem[]", description: "List of items." },
        { name: "onChange", type: "(items: CheckboxItem[]) => void", description: "Called on toggle." },
        { name: "onSubmit", type: "(selected: CheckboxItem[]) => void", description: "Called on Enter." },
        { name: "label", type: "string", description: "Label above the list." },
        { name: "variant", type: '"rounded" | "square"', description: "Checkbox style.", default: '"square"' },
        { name: "highlightColor", type: "string", description: "Color of focused/checked items.", default: '"cyan"' },
        { name: "focus", type: "boolean", description: "Whether accepting input.", default: "true" },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "labelColor", type: "string", description: "Color of the label text." },
        { name: "borderColor", type: "string", description: "Color of the border." },
        { name: "textColor", type: "string", description: "Color of the unhighlighted item text." },
      ]
    }
  },

  // SEPARATOR 
  {
    name: "Separator",
    command: "npx shellcn add separator",
    preview: <SeparatorPreview />,
    docs: {
      description: "Visually separates content with a horizontal or vertical line.",
      import: 'import { Separator } from "@/components/separator"',
      example: `<Separator color="magenta" />\n<Separator orientation="vertical" color="cyan" />`,
      props: [
        { name: "color", type: "string", description: "Separator color.", default: '"gray"' },
        { name: "orientation", type: '"horizontal" | "vertical"', description: "Orientation.", default: '"horizontal"' },
      ]
    }
  },
]