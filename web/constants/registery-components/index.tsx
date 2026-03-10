import React from "react"

const M = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace"
const C = {
  t4: "#3f3f3f", t3: "#525252", t2: "#a3a3a3",
  t1: "#d4d4d4", t0: "#f5f5f5",
  b1: "#141414", b2: "#1e1e1e", b3: "#2a2a2a",
}

function Box({ children, color = C.t1, round = false, style }: {
  children?: React.ReactNode; color?: string; round?: boolean; style?: React.CSSProperties
}) {
  return (
    <div style={{ border: `1px solid ${color}`, borderRadius: round ? 4 : 0, display: "flex", flexDirection: "column", ...style }}>
      {children}
    </div>
  )
}

function Hr({ color = C.b3 }: { color?: string }) {
  return <div style={{ height: "1px", background: color, flexShrink: 0 }} />
}

function Lbl({ t }: { t: string }) {
  return <div style={{ fontFamily: M, fontSize: 9, color: C.t2, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>{t}</div>
}

const ROOT: React.CSSProperties = { width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", fontFamily: M, fontSize: 11 }

export const registryComponents = [

  {
    name: "Text",
    command: "npx shellcn add text",
    preview: (
      <div style={{ ...ROOT, gap: 3, lineHeight: 1.75, padding: "0 2px" }}>
        <Lbl t="• TEXT" />
        <span style={{ color: "#22d3ee" }}>Bold green text</span>
        <span style={{ color: C.t3 }}>Dimmed text</span>
        <span style={{ color: "#fde047", textDecoration: "underline" }}>Underlined yellow</span>
        <span style={{ color: "#f87171", textDecoration: "line-through" }}>Strikethrough red</span>
        <div style={{ marginTop: 10, padding: "5px 9px", background: C.b1, border: `1px solid ${C.b3}`, fontSize: 10, borderRadius: 2 }}>
          <span style={{ color: C.t3 }}>{"<"}</span>
          <span style={{ color: C.t1 }}>Text </span>
          <span style={{ color: C.t2 }}>color</span>
          <span style={{ color: C.t3 }}>{"="}</span>
          <span style={{ color: "#22d3ee" }}>&quot;cyan&quot;</span>
          <span style={{ color: "#fde047" }}> bold</span>
          <span style={{ color: C.t3 }}>{" />"}</span>
        </div>
      </div>
    ),
    docs: {
      description: "Styled text component with colors and formatting.",
      import: 'import { Text } from "@/components/text"',
      example: `<Text color="green" bold>Success!</Text>\n<Text color="#FF5733">Custom hex color</Text>\n<Text dimmed>Loading...</Text>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Text content to display." },
        { name: "color", type: "Color", description: "Text color (named, hex, rgb)." },
        { name: "bold", type: "boolean", description: "Render text in bold.", default: "false" },
        { name: "italic", type: "boolean", description: "Render text in italic.", default: "false" },
        { name: "dimmed", type: "boolean", description: "Dim the text (lower intensity).", default: "false" },
        { name: "underline", type: "boolean", description: "Add an underline to the text.", default: "false" },
        { name: "strikethrough", type: "boolean", description: "Add a strikethrough to the text.", default: "false" },
        { name: "wrap", type: '"wrap" | "truncate" | "truncate-start" | "truncate-middle" | "truncate-end"', description: "Wrap text behavior." },
      ]
    }
  },

  // CONTAINER ───────────────────────────────────────────────────────────────
  {
    name: "Container",
    command: "npx shellcn add container",
    preview: (
      <div style={{ ...ROOT, gap: 10 }}>
        <Lbl t="• CONTAINER" />
        {/* Single border, padding, centered yellow text */}
        <Box color={C.t1} style={{ padding: "8px 12px", alignItems: "center" }}>
          <span style={{ color: "#fde047" }}>Container with border + padding</span>
        </Box>
        {/* Nested layout: outer box shows flexRow children */}
        <Box color={C.t3} style={{ padding: 8, flexDirection: "row", gap: 8 }}>
          <Box color={C.b3} style={{ flex: 2, padding: "6px 8px", gap: 4 }}>
            <div style={{ fontSize: 9, color: C.t4, marginBottom: 4 }}>flexDirection=&quot;col&quot;</div>
            {[100, 70, 50].map((w, i) => (
              <div key={i} style={{ height: 3, width: `${w}%`, background: C.b3, borderRadius: 1 }} />
            ))}
          </Box>
          <Box color={C.b3} style={{ flex: 1, padding: "6px 8px", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <div style={{ fontSize: 9, color: C.t4 }}>center</div>
            <div style={{ width: 14, height: 14, border: `1px solid ${C.b3}` }} />
          </Box>
        </Box>
      </div>
    ),
    docs: {
      description: "A layout container for padding, margin, borders, and flexbox.",
      import: 'import { Container } from "@/components/container"',
      example: `<Container padding={1} radius="round" borderColor="cyan">\n  <Text>Hello, terminal!</Text>\n</Container>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Content inside the box." },
        { name: "flexDirection", type: '"row" | "column" | "row-reverse" | "column-reverse"', description: "Flex direction.", default: '"column"' },
        { name: "alignItems", type: '"flex-start" | "flex-end" | "center" | "stretch"', description: "Cross-axis alignment." },
        { name: "justifyContent", type: '"flex-start" | "flex-end" | "center" | "space-between" | "space-around"', description: "Main-axis alignment." },
        { name: "padding", type: "number", description: "Padding on all sides." },
        { name: "gap", type: "number", description: "Gap between children." },
        { name: "borderStyle", type: "BorderStyle", description: "Border style." },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "borderColor", type: "string", description: "Border color." },
      ]
    }
  },

  // CARD ────────────────────────────────────────────────────────────────────
  {
    name: "Card",
    command: "npx shellcn add card",
    preview: (
      <div style={{ ...ROOT }}>
        <Lbl t="• CARD" />
        {/* Card: outer bordered box (borderColor="cyan") */}
        <Box color="#22d3ee" style={{ overflow: "hidden" }}>
          {/* CardTitle: bold white, marginBottom=1 */}
          <div style={{ padding: "7px 10px 10px", color: C.t0, fontWeight: 700 }}>System Info</div>
          <Hr color="#22d3ee22" />
          {/* Body: Text rows */}
          <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 3, color: C.t1 }}>
            <span>CPU Usage: 42%</span>
            <span>Memory: 3.2 GB / 16 GB</span>
            <span>Uptime: 5 days</span>
          </div>
          <Hr color="#22d3ee22" />
          {/* CardFooter: dimmed, marginTop=1 */}
          <div style={{ padding: "8px 10px 7px", color: C.t3 }}>Updated just now</div>
        </Box>
      </div>
    ),
    docs: {
      description: "A bordered container component for grouping related content, often used with Titles and Footers.",
      import: 'import { Card, CardTitle, CardFooter } from "@/components/card"',
      example: `<Card borderColor="cyan" radius="round">\n  <CardTitle color="cyan">System Info</CardTitle>\n  <Text>CPU: 45%</Text>\n  <CardFooter>Last updated: now</CardFooter>\n</Card>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Content of the card body." },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "borderColor", type: "string", description: "Border color.", default: '"white"' },
        { name: "paddingX", type: "number", description: "Horizontal padding.", default: "1" },
      ]
    }
  },

  // ALERT ───────────────────────────────────────────────────────────────────
  {
    name: "Alert",
    command: "npx shellcn add alert",
    preview: (
      <div style={{ ...ROOT, gap: 8 }}>
        <Lbl t="• ALERT" />
        {/* info: square corners, blue border */}
        <Box color="#3b82f6">
          <div style={{ padding: "7px 10px", color: "#3b82f6", fontSize: 11 }}>
            This is an info alert with square corners.
          </div>
        </Box>
        {/* success: round corners, green border, bold title */}
        <Box color="#22c55e" round>
          <div style={{ padding: "7px 10px 4px", color: "#22c55e", fontWeight: 700 }}>Success</div>
          <div style={{ padding: "0 10px 7px", color: "#22c55e", fontSize: 11 }}>Operation completed.</div>
        </Box>
        {/* warning: round, centered */}
        <Box color="#eab308" round style={{ alignItems: "center" }}>
          <div style={{ padding: "7px 10px", color: "#eab308", fontSize: 11 }}>Center aligned warning.</div>
        </Box>
      </div>
    ),
    docs: {
      description: "Alert box component for displaying colored messages.",
      import: 'import { Alert } from "@/components/alert"',
      example: `<Alert variant="success" title="Done!">\n  All tasks completed successfully.\n</Alert>`,
      props: [
        { name: "children", type: "React.ReactNode", description: "Content of the alert." },
        { name: "variant", type: '"info" | "success" | "warning" | "error"', description: "Visual variant.", default: '"info"' },
        { name: "title", type: "string", description: "Bold title above message." },
        { name: "radius", type: '"none" | "round"', description: "Border radius.", default: '"none"' },
        { name: "color", type: "string", description: "Custom text color override." },
        { name: "borderColor", type: "string", description: "Custom border color override." },
      ]
    }
  },

  // PROGRESS ────────────────────────────────────────────────────────────────
  {
    name: "Progress",
    command: "npx shellcn add progress",
    preview: (
      <div style={{ ...ROOT, gap: 12 }}>
        <Lbl t="• PROGRESS" />
        {[
          { label: "Build:", pct: 35, color: "#eab308" },
          { label: "Tests:", pct: 63, color: C.t1 },
          { label: "Deploy:", pct: 100, color: C.t1 },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: C.t1 }}>{item.label}</span>
              <span style={{ color: item.color }}>{item.pct}%</span>
            </div>
            {/* The bar: filled portion + empty portion — mirrors fillChar/emptyChar */}
            <div style={{ display: "flex", height: 5, gap: 2 }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: "100%", borderRadius: 1,
                  background: i < Math.round(item.pct / 100 * 30) ? item.color : C.b3,
                }} />
              ))}
            </div>
          </div>
        ))}
        {/* fillChar / emptyChar label hint */}
        <div style={{ marginTop: 2, fontSize: 10, color: C.t4 }}>fillChar=&quot;█&quot; · emptyChar=&quot;░&quot;</div>
      </div>
    ),
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
        { name: "showPercentage", type: "boolean", description: "Show percentage label.", default: "true" },
      ]
    }
  },

  // TABLE ───────────────────────────────────────────────────────────────────
  {
    name: "Table",
    command: "npx shellcn add table",
    preview: (
      <div style={{ ...ROOT, gap: 8 }}>
        <Lbl t="• TABLE" />
        {/* Outer table border */}
        <Box color={C.t3} style={{ overflow: "hidden" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 80px", background: C.b1 }}>
            {["Name", "Role", "Status"].map((h) => (
              <div key={h} style={{ padding: "6px 10px", fontSize: 10, fontWeight: 700, color: "#22d3ee", borderRight: `1px solid ${C.b3}` }}>{h}</div>
            ))}
          </div>
          <Hr color={C.t3} />
          {/* Data rows */}
          {[
            { name: "Alice", role: "Engineer", status: "Active" },
            { name: "Bob", role: "Designer", status: "Away" },
            { name: "Charlie", role: "PM", status: "Active" },
          ].map((row, i, arr) => (
            <div key={i}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 80px", background: i % 2 ? C.b1 : "transparent" }}>
                <div style={{ padding: "5px 10px", color: "#eab308", borderRight: `1px solid ${C.b2}` }}>{row.name}</div>
                <div style={{ padding: "5px 10px", color: "#eab308", borderRight: `1px solid ${C.b2}` }}>{row.role}</div>
                <div style={{ padding: "5px 10px", color: "#eab308", textAlign: "center" }}>{row.status}</div>
              </div>
              {i < arr.length - 1 && <Hr color={C.b2} />}
            </div>
          ))}
        </Box>
      </div>
    ),
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

  // INPUT ───────────────────────────────────────────────────────────────────
  {
    name: "Input",
    command: "npx shellcn add input",
    preview: (
      <div style={{ ...ROOT, gap: 12 }}>
        <Lbl t="• INPUT" />
        {/* Focused: white border, label|value + cursor */}
        <Box color={C.t1} style={{ flexDirection: "row", overflow: "hidden" }}>
          {/* Label section — has borderRight (Ink: borderRight={true}) */}
          <div style={{ padding: "7px 10px", borderRight: `1px solid ${C.t1}`, color: C.t1, fontWeight: 700, flexShrink: 0 }}>
            Name:
          </div>
          {/* Value + block cursor */}
          <div style={{ padding: "7px 10px", display: "flex", alignItems: "center", gap: 1, color: "#eab308" }}>
            <span>shellcn</span>
            {/* ▋ cursor as native CSS element */}
            <span style={{ display: "inline-block", width: 2, height: "1em", background: C.t0, borderRadius: 1, marginLeft: 1, animation: "inputBlink 1.1s step-end infinite" }} />
          </div>
        </Box>

        {/* Unfocused: gray border, placeholder */}
        <Box color={C.t3} style={{ flexDirection: "row", overflow: "hidden" }}>
          <div style={{ padding: "7px 10px", borderRight: `1px solid ${C.t3}`, color: C.t3, fontWeight: 700, flexShrink: 0 }}>
            Email:
          </div>
          <div style={{ padding: "7px 10px", color: C.t4 }}>
            Type something...
          </div>
        </Box>

        <style>{`@keyframes inputBlink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </div>
    ),
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
      ]
    }
  },

  // SELECT ──────────────────────────────────────────────────────────────────
  {
    name: "Select",
    command: "npx shellcn add select",
    preview: (
      <div style={{ ...ROOT, gap: 8 }}>
        <Lbl t="• SELECT" />
        <Box color={C.t1} style={{ overflow: "hidden" }}>
          {/* Label row — has borderBottom (Ink: borderBottom={true}) */}
          <div style={{ padding: "6px 10px", borderBottom: `1px solid ${C.t1}`, color: C.t1, fontWeight: 700 }}>
            Pick a framework:
          </div>
          {/* Options — ▶ indicator on active item (indicator prop) */}
          {[
            { label: "React", active: true },
            { label: "Vue", active: false },
            { label: "Svelte", active: false },
          ].map((opt, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
              background: opt.active ? C.b2 : "transparent",
              borderBottom: i < 2 ? `1px solid ${C.b2}` : "none",
            }}>
              <span style={{ color: opt.active ? "#eab308" : "transparent", fontSize: 10, width: 10, flexShrink: 0 }}>▶</span>
              <span style={{ color: opt.active ? "#eab308" : C.t3, fontWeight: opt.active ? 700 : 400 }}>{opt.label}</span>
            </div>
          ))}
        </Box>
      </div>
    ),
    docs: {
      description: "Arrow-key select menu for choosing from a list of options.",
      import: 'import { Select } from "@/components/select"',
      example: `<Select\n  label="Choose a framework:"\n  options={[{ label: "React", value: "react" }]}\n  onSelect={(opt) => console.log(opt.value)}\n/>`,
      props: [
        { name: "options", type: "SelectOption[]", description: "List of options." },
        { name: "onSelect", type: "(option: SelectOption) => void", description: "Called on selection." },
        { name: "label", type: "string", description: "Label above options." },
        { name: "indicator", type: "string", description: "Active item indicator.", default: '"❯"' },
        { name: "highlightColor", type: "string", description: "Color of the active item.", default: '"cyan"' },
        { name: "initialIndex", type: "number", description: "Initially highlighted index.", default: "0" },
        { name: "focus", type: "boolean", description: "Whether select is focused.", default: "true" },
      ]
    }
  },

  // CHECKBOX ────────────────────────────────────────────────────────────────
  {
    name: "Checkbox",
    command: "npx shellcn add checkbox",
    preview: (
      <div style={{ ...ROOT, gap: 8 }}>
        <Lbl t="• CHECKBOX" />
        <Box color={C.t1} style={{ overflow: "hidden" }}>
          {/* Label row — borderBottom */}
          <div style={{ padding: "6px 10px", borderBottom: `1px solid ${C.t1}`, color: "#eab308", fontWeight: 700 }}>
            Select features:
          </div>
          {/* Items — ☑/☐ as native CSS boxes */}
          {[
            { label: "TypeScript", checked: true, focused: true },
            { label: "ESLint", checked: false, focused: false },
            { label: "Prettier", checked: true, focused: false },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
              background: item.focused ? C.b2 : "transparent",
              borderBottom: i < 2 ? `1px solid ${C.b2}` : "none",
            }}>
              {/* Native CSS checkbox box — replaces ☐ / ☑ */}
              <div style={{
                width: 13, height: 13, flexShrink: 0,
                border: `1px solid ${item.checked ? "#eab308" : C.t3}`,
                borderRadius: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: item.checked ? "#eab30814" : "transparent",
              }}>
                {item.checked && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3.2 5.8L6.5 2.2" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{ color: item.checked ? "#eab308" : C.t3, fontWeight: item.focused ? 700 : 400 }}>{item.label}</span>
            </div>
          ))}
          {/* Hint line — dimColor */}
          <div style={{ padding: "5px 10px", color: C.t4, fontSize: 10 }}>
            ↑↓ navigate · space toggle · enter confirm
          </div>
        </Box>
      </div>
    ),
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
      ]
    }
  },

  // SEPARATOR ───────────────────────────────────────────────────────────────
  {
    name: "Separator",
    command: "npx shellcn add separator",
    preview: (
      <div style={{ ...ROOT, gap: 16, padding: "0 2px" }}>
        <Lbl t="• SEPARATOR" />
        {/* Main demo: content, separator, content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ color: C.t1 }}>Above separator</span>
          {/* Native div replaces the ─────── ASCII line + Ink borderBottom box */}
          <div style={{ height: 1, background: "#eab308", width: "100%" }} />
          <span style={{ color: C.t1 }}>Below separator</span>
        </div>
        {/* Color variants */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { label: "gray", color: C.t3 },
            { label: "white", color: C.t1 },
            { label: "cyan", color: "#22d3ee" },
            { label: "magenta", color: "#c084fc" },
          ].map((sep) => (
            <div key={sep.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 9, color: C.t4, width: 44, flexShrink: 0 }}>{sep.label}</span>
              <div style={{ flex: 1, height: 1, background: sep.color }} />
            </div>
          ))}
        </div>
      </div>
    ),
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