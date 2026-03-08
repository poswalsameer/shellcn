import React, { useState } from "react"
import { Text, Box, useInput } from "ink"

/** A single option in the select menu. */
export interface SelectOption {
  /** Display label for the option. */
  label: string
  /** Value associated with the option. */
  value: string
}

/** Border radius options mapping to terminal box styles. */
export type Radius = "none" | "round"

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
  /** Color of the label text. */
  labelColor?: string
  /** Color of the border. */
  borderColor?: string
  /** Color of the unhighlighted option text. */
  textColor?: string
  /** Color of the highlighted option. */
  highlightColor?: string
  /** Indicator character for the selected item. */
  indicator?: string
  /** Index of the initially highlighted item. */
  initialIndex?: number
  /** Whether the select is focused and accepting input. */
  focus?: boolean
  /**
   * Border radius. Maps to terminal box styles.
   * "none" uses square corners, others use rounded corners.
   */
  radius?: Radius
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
  labelColor,
  borderColor,
  textColor,
  highlightColor = "cyan",
  indicator = "❯",
  initialIndex = 0,
  focus = true,
  radius = "none",
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

  const resolvedBorderStyle = radius === "none" ? "single" : "round"
  const resolvedBorderColor = borderColor ?? (focus ? highlightColor : "gray")

  return (
    <Box
      flexDirection="column"
      borderStyle={resolvedBorderStyle}
      borderColor={resolvedBorderColor}
    >
      {label && (
        <Box
          borderStyle="single"
          borderTop={false}
          borderBottom={true}
          borderLeft={false}
          borderRight={false}
          borderColor={resolvedBorderColor}
          paddingLeft={1}
          paddingRight={1}
        >
          <Text bold color={labelColor ?? resolvedBorderColor}>
            {label}
          </Text>
        </Box>
      )}
      <Box flexDirection="column" paddingX={1}>
        {options.map((option, index) => {
          const isHighlighted = index === highlightedIndex
          return (
            <Box key={option.value} flexDirection="row" gap={1}>
              <Text color={isHighlighted ? highlightColor : textColor}>
                {isHighlighted ? indicator : " "}
              </Text>
              <Text
                color={isHighlighted ? highlightColor : textColor}
                bold={isHighlighted}
              >
                {option.label}
              </Text>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Select
