import React from "react"
import { Text } from "./text.js"
import { Container } from "./container.js"

/** Alert variant types. */
export type AlertVariant = "info" | "success" | "warning" | "error"

/** Color configuration per variant. */
const VARIANT_COLORS: Record<AlertVariant, string> = {
  info: "blue",
  success: "green",
  warning: "yellow",
  error: "red",
}

/** Border radius options mapping to terminal box styles. */
export type Radius = "none" | "round"

/** Props for the Alert component. */
export interface AlertProps {
  /** Content of the alert. */
  children: React.ReactNode
  /** Visual variant of the alert. */
  variant?: AlertVariant
  /** Optional title displayed in bold above the message. */
  title?: string
  /**
   * Border radius. Maps to terminal box styles.
   * "none" uses square corners, others use rounded corners.
   */
  radius?: Radius
  /** Optional manual override for border style. */
  borderStyle?: "single" | "double" | "round" | "bold" | "classic"
  /** Custom text color override. Defaults to the variant's color. */
  color?: string
  /** Custom border color override. Defaults to the variant's color. */
  borderColor?: string
  /** Flex direction. Defaults to "column". */
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
  /** Align items along the cross axis. */
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch"
  /** Justify content along the main axis. */
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
}

/**
 * Alert box component.
 * Displays a bordered message with an icon, colored by variant.
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Done!">
 *   All tasks completed successfully.
 * </Alert>
 *
 * <Alert variant="error" radius="none">Something went wrong.</Alert>
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  variant = "info",
  title,
  radius = "none",
  borderStyle,
  color,
  borderColor,
  flexDirection = "column",
  alignItems,
  justifyContent,
}) => {
  const defaultColor = VARIANT_COLORS[variant]
  const resolvedColor = color ?? defaultColor
  const resolvedBorderColor = borderColor ?? defaultColor

  return (
    <Container
      borderStyle={borderStyle}
      radius={radius}
      borderColor={resolvedBorderColor}
      paddingX={1}
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {title ? (
        <Text color={resolvedColor} bold>
          {title}
        </Text>
      ) : null}
      <Text color={resolvedColor}>{children}</Text>
    </Container>
  )
}

export default Alert
