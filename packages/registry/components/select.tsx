import React, { useState } from "react"
import { Text, Box, useInput } from "ink"

/** A single option in the select menu. */
export interface SelectOption {
  /** Display label for the option. */
  label: string
  /** Value associated with the option. */
  value: string
}

/** Props for the Select component. */
export interface SelectProps {
  /** List of options to display. */
  options: SelectOption[]
  /** Called when the user selects an option (presses Enter). */
  onSelect?: (option: SelectOption) => void
  /** Called when the highlighted option changes. */
  onChange?: (option: SelectOption) => void
  /** Label text displayed above the options. */
  label?: string
  /** Color of the highlighted option. */
  highlightColor?: string
  /** Indicator character for the selected item. */
  indicator?: string
  /** Index of the initially highlighted item. */
  initialIndex?: number
  /** Whether the select is focused and accepting input. */
  focus?: boolean
}

/**
 * Arrow-key select menu.
 * Navigates options with up/down arrows and selects with Enter.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Choose a framework:"
 *   options={[
 *     { label: "React", value: "react" },
 *     { label: "Vue", value: "vue" },
 *     { label: "Svelte", value: "svelte" },
 *   ]}
 *   onSelect={(opt) => console.log("Selected:", opt.value)}
 * />
 * ```
 */
export const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  onChange,
  label,
  highlightColor = "cyan",
  indicator = "❯",
  initialIndex = 0,
  focus = true,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState(initialIndex)

  useInput(
    (input, key) => {
      if (!focus) return

      if (key.upArrow) {
        const nextIndex = (highlightedIndex - 1 + options.length) % options.length
        setHighlightedIndex(nextIndex)
        onChange?.(options[nextIndex])
        return
      }

      if (key.downArrow) {
        const nextIndex = (highlightedIndex + 1) % options.length
        setHighlightedIndex(nextIndex)
        onChange?.(options[nextIndex])
        return
      }

      if (key.return) {
        onSelect?.(options[highlightedIndex])
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
      {options.map((option, index) => {
        const isHighlighted = index === highlightedIndex
        return (
          <Box key={option.value} flexDirection="row" gap={1}>
            <Text color={isHighlighted ? highlightColor : undefined}>
              {isHighlighted ? indicator : " "}
            </Text>
            <Text
              color={isHighlighted ? highlightColor : undefined}
              bold={isHighlighted}
            >
              {option.label}
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}

export default Select
