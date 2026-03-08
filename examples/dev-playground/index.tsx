import React, { useState } from "react"
import { render, useApp } from "ink"

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
import { Container } from "../../packages/registry/components/container.js"
import { Separator } from "../../packages/registry/components/separator.js"
import { Progress } from "../../packages/registry/components/progress.js"
import { Table } from "../../packages/registry/components/table.js"
import { Input } from "../../packages/registry/components/input.js"
import { Select } from "../../packages/registry/components/select.js"
import { Checkbox } from "../../packages/registry/components/checkbox.js"
import { Alert } from "../../packages/registry/components/alert.js"
import { Card, CardTitle, CardFooter } from "../../packages/registry/components/card.js"

/** Section wrapper that labels each component preview. */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Container flexDirection="column" gap={1}>
    <Text bold color="white">
      {title}
    </Text>
    <Container flexDirection="column">
      {children}
    </Container>
  </Container>
)


const App: React.FC = () => {
  const { exit } = useApp()
  const [inputValue, setInputValue] = useState("")

  return (
    <Container flexDirection="column" padding={1} gap={2}>
      {/* 1. Text */}
      <Section title="• TEXT">
        <Text color="green" bold>Bold green text</Text>
        <Text dimmed>Dimmed text</Text>
        <Text color="yellow" underline>Underlined yellow</Text>
        <Text color="red" strikethrough>Strikethrough red</Text>
      </Section>

      {/* 2. Container */}
      <Section title="• CONTAINER">
        <Container radius="round" borderColor="blue" padding={1}>
          <Text color="blue">Container with border radius and padding</Text>
        </Container>
      </Section>

      {/* 3. Separator */}
      <Section title="• SEPARATOR">
        <Text dimmed>Above separator</Text>
        <Separator color="magenta" />
        <Text dimmed>Below separator</Text>
      </Section>

      {/* 4. Progress */}
      <Section title="• PROGRESS">
        <Progress value={0.35} color="yellow" showPercentage label="Build:" />
        <Progress value={0.68} color="cyan" showPercentage label="Test: " />
        <Progress value={1.0} color="green" showPercentage label="Lint: " />
        <Progress value={0.5} color="blue" fillChar="▓" emptyChar="░" label="Upload:" showPercentage />
      </Section>

      {/* 5. Table */}
      <Section title="• TABLE">
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
      <Section title="• INPUT">
        <Input
          label="Name:"
          placeholder="Type something..."
          value={inputValue}
          onChange={setInputValue}
          focus={false}
        />
      </Section>

      {/* 7. Select */}
      <Section title="• SELECT">
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
      <Section title="• CHECKBOX">
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
      <Section title="• ALERT">
        <Alert variant="info" radius="none">This is an info alert with square corners.</Alert>
        <Alert variant="success" title="Success" radius="round">Operation completed.</Alert>
        <Alert variant="warning" radius="round" alignItems="center">Center aligned warning.</Alert>
        <Alert variant="error" title="Critical Error" borderColor="magenta" color="white" radius="none">
          Connection failed. (Custom colored)
        </Alert>
      </Section>

      {/* 10. Card */}
      <Section title="• CARD">
        <Card borderColor="cyan" radius="round">
          <CardTitle color="white">System Info</CardTitle>
          <Text>CPU Usage: 42%</Text>
          <Text>Memory: 3.2 GB / 16 GB</Text>
          <Text>Uptime: 5 days</Text>
          <CardFooter>Updated just now</CardFooter>
        </Card>
      </Section>
    </Container>
  )
}

render(<App />)
