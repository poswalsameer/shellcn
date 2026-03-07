import React from "react"
import { Text as InkText } from "ink"

/** Props for the Text component. */
export interface TextProps {
  /** Text content to display. */
  children: React.ReactNode
  /** Text color (named color, hex, or rgb). */
  color?: string
  /** Background color. */
  backgroundColor?: string
  /** Render text in bold. */
  bold?: boolean
  /** Render text in italic. */
  italic?: boolean
  /** Dim the text (lower intensity). */
  dimmed?: boolean
  /** Add an underline to the text. */
  underline?: boolean
  /** Add a strikethrough to the text. */
  strikethrough?: boolean
  /** Wrap text. When disabled, text is truncated instead of wrapping. */
  wrap?: "wrap" | "truncate" | "truncate-start" | "truncate-middle" | "truncate-end"
}

/**
 * Styled text component.
 * A thin wrapper around Ink's Text with a cleaner prop interface.
 *
 * @example
 * ```tsx
 * <Text color="green" bold>Success!</Text>
 * <Text dimmed>Loading...</Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
  children,
  color,
  backgroundColor,
  bold = false,
  italic = false,
  dimmed = false,
  underline = false,
  strikethrough = false,
  wrap,
}) => {
  return (
    <InkText
      color={color}
      backgroundColor={backgroundColor}
      bold={bold}
      italic={italic}
      dimColor={dimmed}
      underline={underline}
      strikethrough={strikethrough}
      wrap={wrap}
    >
      {children}
    </InkText>
  )
}

export default Text
