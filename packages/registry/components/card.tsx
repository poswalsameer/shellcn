import React from "react"
import { Text, Box } from "ink"

/** Props for the Card component. */
export interface CardProps {
  /** Content of the card body. */
  children: React.ReactNode
  /** Title displayed at the top of the card. */
  title?: string
  /** Footer text displayed at the bottom of the card. */
  footer?: string
  /** Width of the card. */
  width?: number | string
  /** Border style. */
  borderStyle?: "single" | "double" | "round" | "bold" | "classic"
  /** Border color. */
  borderColor?: string
  /** Title text color. */
  titleColor?: string
  /** Footer text color. */
  footerColor?: string
  /** Padding inside the card. */
  padding?: number
}

/**
 * Card container component.
 * A bordered container with optional title and footer sections.
 *
 * @example
 * ```tsx
 * <Card title="System Info" footer="Last updated: now" borderColor="cyan">
 *   <Text>CPU: 45%</Text>
 *   <Text>Memory: 2.1 GB</Text>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  footer,
  width,
  borderStyle = "round",
  borderColor = "white",
  titleColor = "white",
  footerColor = "gray",
  padding = 1,
}) => {
  return (
    <Box
      flexDirection="column"
      borderStyle={borderStyle}
      borderColor={borderColor}
      width={width}
      paddingLeft={padding}
      paddingRight={padding}
    >
      {title && (
        <Box marginBottom={1}>
          <Text color={titleColor} bold>
            {title}
          </Text>
        </Box>
      )}

      <Box flexDirection="column">{children}</Box>

      {footer && (
        <Box marginTop={1}>
          <Text color={footerColor} dimColor>
            {footer}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default Card
