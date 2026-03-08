import React from "react"
import { Text as InkText } from "ink"

/**
 * Supported color values.
 *
 * Accepts:
 * - Named colors: `"red"`, `"green"`, `"cyan"`, `"magentaBright"`, etc.
 * - Hex values: `"#FF5733"`, `"#0af"`, etc.
 * - RGB strings: `"rgb(255, 87, 51)"`
 * - Any string supported by chalk
 */
export type Color =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray"
  | "grey"
  | "blackBright"
  | "redBright"
  | "greenBright"
  | "yellowBright"
  | "blueBright"
  | "magentaBright"
  | "cyanBright"
  | "whiteBright"
  | (string & {})

/** Props for the Text component. */
export interface TextProps {
  /** Text content to display. */
  children: React.ReactNode
  /**
   * Text color.
   * Supports named colors (`"green"`), hex values (`"#FF5733"`), and RGB strings (`"rgb(255,87,51)"`).
   */
  color?: Color
  /**
   * Background color.
   * Supports named colors (`"green"`), hex values (`"#FF5733"`), and RGB strings (`"rgb(255,87,51)"`).
   */
  backgroundColor?: Color
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
  /** Inverse background and foreground colors. */
  inverse?: boolean
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
 * <Text color="#FF5733">Custom hex color</Text>
 * <Text color="rgb(255, 87, 51)">RGB color</Text>
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
  inverse = false,
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
      inverse={inverse}
      wrap={wrap}
    >
      {children}
    </InkText>
  )
}

export default Text
