import { render, useApp, useInput } from "ink"
import React, { useState, useEffect } from "react"

// Import shellcn components from the registry
import { Text } from "../../packages/registry/components/text.js"
import { Container } from "../../packages/registry/components/container.js"
import { Checkbox, type CheckboxItem } from "../../packages/registry/components/checkbox.js"
import { Progress } from "../../packages/registry/components/progress.js"
import { Alert } from "../../packages/registry/components/alert.js"
import { Card } from "../../packages/registry/components/card.js"

/**
 * Demo Task Manager Application
 *
 * A simple task manager CLI demonstrating:
 * - Checkbox component for task selection
 * - Progress component for completion tracking
 * - Alert component for feedback messages
 * - Card component for task grouping
 */

const INITIAL_TASKS: CheckboxItem[] = [
  { label: "Set up project scaffolding", value: "scaffold", checked: true },
  { label: "Design component API", value: "api", checked: true },
  { label: "Implement Separator component", value: "separator", checked: true },
  { label: "Implement Table component", value: "table", checked: false },
  { label: "Write documentation", value: "docs", checked: false },
  { label: "Add unit tests", value: "tests", checked: false },
  { label: "Publish to npm", value: "publish", checked: false },
]

const TaskManagerApp: React.FC = () => {
  const { exit } = useApp()
  const [tasks, setTasks] = useState<CheckboxItem[]>(INITIAL_TASKS)
  const [lastAction, setLastAction] = useState<string | null>(null)

  // Calculate progress
  const completedCount = tasks.filter((t) => t.checked).length
  const totalCount = tasks.length
  const progressValue = totalCount > 0 ? completedCount / totalCount : 0

  // Handle quitting
  useInput((input, key) => {
    if (input === "q" || (key.ctrl && input === "c")) {
      exit()
      setTimeout(() => process.exit(0), 100)
    }
  })

  const handleChange = (updatedItems: CheckboxItem[]) => {
    setTasks(updatedItems)

    // Find what changed
    const changed = updatedItems.find((item, i) => item.checked !== tasks[i].checked)
    if (changed) {
      setLastAction(
        changed.checked
          ? `✓ Completed: "${changed.label}"`
          : `○ Unchecked: "${changed.label}"`
      )
    }
  }

  const handleSubmit = (selectedItems: CheckboxItem[]) => {
    setLastAction(
      `Confirmed ${selectedItems.length} of ${totalCount} tasks as complete!`
    )
  }

  return (
    <Container flexDirection="column" padding={1}>
      {/* Header */}
      <Container borderStyle="double" borderColor="magenta" padding={1} paddingY={0}>
        <Text color="magenta" bold>
          Task Manager Demo
        </Text>
      </Container>

      <Text> </Text>

      {/* Progress overview */}
      <Card title="Progress" borderColor="cyan" titleColor="cyan">
        <Progress
          value={progressValue}
          color={progressValue === 1 ? "green" : "cyan"}
          showPercentage
          label={`${completedCount}/${totalCount}`}
        />
      </Card>

      <Text> </Text>

      {/* Task list */}
      <Card title="Tasks" borderColor="white">
        <Checkbox
          items={tasks}
          onChange={handleChange}
          onSubmit={handleSubmit}
          highlightColor="magenta"
        />
      </Card>

      <Text> </Text>

      {/* Feedback */}
      {lastAction && (
        <Alert
          variant={progressValue === 1 ? "success" : "info"}
          title={progressValue === 1 ? "All Done!" : "Updated"}
        >
          {lastAction}
        </Alert>
      )}

      {progressValue === 1 && (
        <Container marginTop={1}>
          <Alert variant="success">
            🎉 All tasks completed! Great work!
          </Alert>
        </Container>
      )}

      <Text> </Text>
      <Text dimmed>Press q to quit</Text>
    </Container>
  )
}

render(<TaskManagerApp />)
