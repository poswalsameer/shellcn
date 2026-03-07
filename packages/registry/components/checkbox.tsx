import React, { useState } from "react"
import { Text, Box, useInput } from "ink"

/** A single item in the checkbox list. */
export interface CheckboxItem {
  /** Display label for the item. */
  label: string
  /** Value associated with the item. */
  value: string
  /** Whether the item is initially checked. */
  checked?: boolean
}

/** Props for the Checkbox component. */
export interface CheckboxProps {
  /** List of items to display. */
  items: CheckboxItem[]
  /** Called whenever the checked state of any item changes. */
  onChange?: (items: CheckboxItem[]) => void
  /** Called when the user presses Enter to confirm selection. */
  onSubmit?: (selectedItems: CheckboxItem[]) => void
  /** Label text displayed above the checkbox list. */
  label?: string
  /** Color of the highlighted/focused item. */
  highlightColor?: string
  /** Character for checked state. */
  checkedChar?: string
  /** Character for unchecked state. */
  uncheckedChar?: string
  /** Whether the checkbox is focused and accepting input. */
  focus?: boolean
}

/**
 * Multi-select checkbox list.
 * Navigate with up/down arrows, toggle with Space, confirm with Enter.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Select features:"
 *   items={[
 *     { label: "TypeScript", value: "ts", checked: true },
 *     { label: "ESLint", value: "eslint" },
 *     { label: "Prettier", value: "prettier" },
 *   ]}
 *   onSubmit={(selected) => console.log(selected)}
 * />
 * ```
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  items: initialItems,
  onChange,
  onSubmit,
  label,
  highlightColor = "cyan",
  checkedChar = "◉",
  uncheckedChar = "○",
  focus = true,
}) => {
  const [items, setItems] = useState<CheckboxItem[]>(
    initialItems.map((item) => ({ ...item, checked: item.checked ?? false }))
  )
  const [focusIndex, setFocusIndex] = useState(0)

  useInput(
    (input, key) => {
      if (!focus) return

      if (key.upArrow) {
        setFocusIndex((prev) => (prev - 1 + items.length) % items.length)
        return
      }

      if (key.downArrow) {
        setFocusIndex((prev) => (prev + 1) % items.length)
        return
      }

      // Space key toggles check state
      if (input === " ") {
        const updated = items.map((item, index) =>
          index === focusIndex ? { ...item, checked: !item.checked } : item
        )
        setItems(updated)
        onChange?.(updated)
        return
      }

      if (key.return) {
        const selected = items.filter((item) => item.checked)
        onSubmit?.(selected)
        return
      }
    },
    { isActive: focus }
  )

  return (
    <Box flexDirection="column">
      {label && (
        <Box marginBottom={1}>
          <Text bold>{label}</Text>
        </Box>
      )}
      {items.map((item, index) => {
        const isFocused = index === focusIndex
        return (
          <Box key={item.value} flexDirection="row" gap={1}>
            <Text color={item.checked ? "green" : "gray"}>
              {item.checked ? checkedChar : uncheckedChar}
            </Text>
            <Text
              color={isFocused ? highlightColor : undefined}
              bold={isFocused}
            >
              {item.label}
            </Text>
          </Box>
        )
      })}
      <Box marginTop={1}>
        <Text dimColor>↑↓ navigate · space toggle · enter confirm</Text>
      </Box>
    </Box>
  )
}

export default Checkbox
