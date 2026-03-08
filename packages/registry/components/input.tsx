import React, { useRef, useEffect, useCallback } from "react"
import { Text, Box, useInput, Key } from "ink"

/** Border radius options mapping to terminal box styles. */
export type Radius = "none" | "round"

/** Props for the Input component. */
export interface InputProps {
  /** Placeholder text shown when value is empty. */
  placeholder?: string
  /** Current value of the input (controlled mode). */
  value?: string
  /** Called whenever the input value changes. */
  onChange?: (value: string) => void
  /** Called when the user presses Enter. */
  onSubmit?: (value: string) => void
  /** Label text displayed before the input. */
  label?: string
  /** Color of the label text. */
  labelColor?: string
  /** Color of the border. */
  borderColor?: string
  /** Color of the input text. */
  textColor?: string
  /** Color of the placeholder text. */
  placeholderColor?: string
  /** Character to show for password masking. Set to empty string to disable. */
  mask?: string
  /** Whether the input is focused and accepting keystrokes. */
  focus?: boolean
  /**
   * Border radius. Maps to terminal box styles.
   * "none" uses square corners, others use rounded corners.
   */
  radius?: Radius
}

/**
 * Text input component.
 * Captures keyboard input and displays it inline in the terminal.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState("");
 * <Input
 *   label="Name:"
 *   placeholder="Enter your name"
 *   value={value}
 *   onChange={setValue}
 *   onSubmit={(v) => console.log("Submitted:", v)}
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  placeholder = "",
  value = "",
  onChange,
  onSubmit,
  label,
  labelColor,
  textColor = "white",
  placeholderColor = "gray",
  mask,
  focus = true,
  radius = "none",
  borderColor,
}) => {
  const valueRef = useRef(value)
  const onChangeRef = useRef(onChange)
  const onSubmitRef = useRef(onSubmit)

  useEffect(() => {
    valueRef.current = value
    onChangeRef.current = onChange
    onSubmitRef.current = onSubmit
  }, [value, onChange, onSubmit])

  const handleInput = useCallback((input: string, key: Key) => {
    if (!focus) return

    const currentValue = valueRef.current

    if (key.return) {
      onSubmitRef.current?.(currentValue)
      return
    }

    if (key.backspace || key.delete) {
      const newValue = currentValue.slice(0, -1)
      onChangeRef.current?.(newValue)
      return
    }

    // Ignore control characters
    if (key.ctrl || key.meta || key.escape || key.tab) return
    // Ignore arrow keys and other special keys
    if (key.upArrow || key.downArrow || key.leftArrow || key.rightArrow) return

    if (input) {
      onChangeRef.current?.(currentValue + input)
    }
  }, [focus])

  useInput(handleInput, { isActive: focus })

  const displayValue = mask ? mask.repeat(value.length) : value
  const isEmpty = value.length === 0

  const resolvedBorderStyle = radius === "none" ? "single" : "round"
  const resolvedBorderColor = borderColor ?? (focus ? "cyan" : "gray")

  return (
    <Box
      flexDirection="row"
      borderStyle={resolvedBorderStyle}
      borderColor={resolvedBorderColor}
    >
      {label && (
        <Box
          borderStyle="single"
          borderTop={false}
          borderBottom={false}
          borderLeft={false}
          borderRight={true}
          borderColor={resolvedBorderColor}
          paddingLeft={1}
          paddingRight={1}
        >
          <Text bold color={labelColor ?? resolvedBorderColor}>
            {label}
          </Text>
        </Box>
      )}
      <Box paddingLeft={1} paddingRight={1} flexDirection="row" gap={1}>
        <Text color={isEmpty ? placeholderColor : textColor}>
          {isEmpty ? placeholder : displayValue}
        </Text>
        {focus && <Text color="cyan">▋</Text>}
      </Box>
    </Box>
  )
}

export default Input
