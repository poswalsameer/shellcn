import React from "react"
import { Box as InkBox } from "ink"

/** Props for the Separator component. */
export interface SeparatorProps {
  /** Color of the separator. Defaults to gray. */
  color?: string
  /**
   * Orientation of the separator.
   * "horizontal" draws a line across the width.
   * "vertical" draws a line down the height.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical"
}

/**
 * Visually separates content.
 * Renders a horizontal or vertical line.
 *
 * @example
 * ```tsx
 * <Separator color="magenta" />
 * ```
 */
export const Separator: React.FC<SeparatorProps> = ({
  color = "gray",
  orientation = "horizontal",
}) => {
  if (orientation === "horizontal") {
    return (
      <InkBox
        width="100%"
        borderStyle="single"
        borderTop={false}
        borderBottom={true}
        borderLeft={false}
        borderRight={false}
        borderColor={color}
      />
    )
  }

  return (
    <InkBox
      height="100%"
      borderStyle="single"
      borderTop={false}
      borderBottom={false}
      borderLeft={true}
      borderRight={false}
      borderColor={color}
    />
  )
}

export default Separator
