import React from "react"
import { Text, Box } from "ink"

/** Alert variant types. */
type AlertVariant = "info" | "success" | "warning" | "error"

/** Icon and color configuration per variant. */
const VARIANT_CONFIG: Record<AlertVariant, { icon: string; color: string }> = {
  info: { icon: "ℹ", color: "blue" },
  success: { icon: "✓", color: "green" },
  warning: { icon: "⚠", color: "yellow" },
  error: { icon: "✗", color: "red" },
}

/** Props for the Alert component. */
export interface AlertProps {
  /** Content of the alert. */
  children: React.ReactNode
  /** Visual variant of the alert. */
  variant?: AlertVariant
  /** Optional title displayed in bold above the message. */
  title?: string
  /** Custom icon to override the variant's default icon. */
  icon?: string
  /** Border style for the alert box. */
  borderStyle?: "single" | "double" | "round" | "bold" | "classic"
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
 * <Alert variant="error">Something went wrong.</Alert>
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  variant = "info",
  title,
  icon: customIcon,
  borderStyle = "round",
}) => {
  const config = VARIANT_CONFIG[variant]
  const icon = customIcon ?? config.icon

  return (
    <Box
      borderStyle={borderStyle}
      borderColor={config.color}
      paddingLeft={1}
      paddingRight={1}
      flexDirection="column"
    >
      {title ? (
        <Text color={config.color} bold>
          {icon} {title}
        </Text>
      ) : null}
      <Box flexDirection="row" gap={1}>
        {!title && <Text color={config.color}>{icon}</Text>}
        <Text>{children}</Text>
      </Box>
    </Box>
  )
}

export default Alert
