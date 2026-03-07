import React, { useState, useEffect } from "react"
import { render, Text as InkText, Box as InkBox } from "ink"

/**
 * Dev Playground — Live Component Preview
 *
 * This app renders all 10 shellcn components side by side
 * so you can visually verify them during development.
 *
 * Run with: npm run dev:preview (from repo root)
 * Hot-reloads on file changes via tsx watch.
 */

// ─── Import components directly from the registry ───────────────────────────
import { Text } from "../../packages/registry/components/text.js"
import { Box } from "../../packages/registry/components/box.js"
import { Spinner } from "../../packages/registry/components/spinner.js"
import { Progress } from "../../packages/registry/components/progress.js"
import { Table } from "../../packages/registry/components/table.js"
import { Input } from "../../packages/registry/components/input.js"
import { Select } from "../../packages/registry/components/select.js"
import { Checkbox } from "../../packages/registry/components/checkbox.js"
import { Alert } from "../../packages/registry/components/alert.js"
import { Card } from "../../packages/registry/components/card.js"

/** Section wrapper that labels each component preview. */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <InkBox flexDirection="column" marginBottom={1}>
    <InkText bold color="magenta">
      {"─── "}{title}{" ───"}
    </InkText>
    <InkBox marginLeft={2} flexDirection="column">
      {children}
    </InkBox>
  </InkBox>
)

const App: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [inputValue, setInputValue] = useState("")

  // Animate progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 1 ? 0 : prev + 0.02))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <InkBox flexDirection="column" padding={1}>
      <InkText bold color="cyan">
        {"╔══════════════════════════════════════════╗"}
      </InkText>
      <InkText bold color="cyan">
        {"║    shellcn — Component Preview           ║"}
      </InkText>
      <InkText bold color="cyan">
        {"╚══════════════════════════════════════════╝"}
      </InkText>
      <InkText> </InkText>

      {/* 1. Text */}
      <Section title="Text">
        <Text color="green" bold>Bold green text</Text>
        <Text dimmed>Dimmed text</Text>
        <Text color="yellow" underline>Underlined yellow</Text>
        <Text color="red" strikethrough>Strikethrough red</Text>
      </Section>

      {/* 2. Box */}
      <Section title="Box">
        <Box borderStyle="round" borderColor="blue" padding={1}>
          <Text color="blue">Box with round border and padding</Text>
        </Box>
      </Section>

      {/* 3. Spinner */}
      <Section title="Spinner">
        <Spinner label="Loading (dots)..." color="cyan" type="dots" />
        <Spinner label="Processing (arc)..." color="yellow" type="arc" />
        <Spinner label="Building (circle)..." color="green" type="circle" />
      </Section>

      {/* 4. Progress */}
      <Section title="Progress">
        <Progress value={progress} color="green" showPercentage />
        <Progress value={0.75} color="blue" fillChar="▓" emptyChar="░" label="Upload:" />
      </Section>

      {/* 5. Table */}
      <Section title="Table">
        <Table
          columns={[
            { header: "Name", accessor: "name", width: 15 },
            { header: "Role", accessor: "role", width: 12 },
            { header: "Status", accessor: "status", width: 10, align: "center" },
          ]}
          data={[
            { name: "Alice", role: "Engineer", status: "Active" },
            { name: "Bob", role: "Designer", status: "Away" },
            { name: "Charlie", role: "PM", status: "Active" },
          ]}
          headerColor="cyan"
        />
      </Section>

      {/* 6. Input */}
      <Section title="Input">
        <Input
          label="Name:"
          placeholder="Type something..."
          value={inputValue}
          onChange={setInputValue}
          focus={false}
        />
      </Section>

      {/* 7. Select */}
      <Section title="Select">
        <Select
          label="Pick a framework:"
          options={[
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Svelte", value: "svelte" },
          ]}
          focus={false}
        />
      </Section>

      {/* 8. Checkbox */}
      <Section title="Checkbox">
        <Checkbox
          label="Select features:"
          items={[
            { label: "TypeScript", value: "ts", checked: true },
            { label: "ESLint", value: "eslint" },
            { label: "Prettier", value: "prettier", checked: true },
          ]}
          focus={false}
        />
      </Section>

      {/* 9. Alert */}
      <Section title="Alert">
        <Alert variant="info">This is an info alert.</Alert>
        <Alert variant="success" title="Success">Operation completed.</Alert>
        <Alert variant="warning">Disk space running low.</Alert>
        <Alert variant="error" title="Error">Connection failed.</Alert>
      </Section>

      {/* 10. Card */}
      <Section title="Card">
        <Card title="System Info" footer="Updated just now" borderColor="cyan">
          <Text>CPU Usage: 42%</Text>
          <Text>Memory: 3.2 GB / 16 GB</Text>
          <Text>Uptime: 5 days</Text>
        </Card>
      </Section>

      <InkText> </InkText>
      <InkText dimColor>Press Ctrl+C to exit</InkText>
    </InkBox>
  )
}

render(<App />)
