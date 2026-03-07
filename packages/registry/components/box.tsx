import React from "react"
import { Box as InkBox } from "ink"

/** Border style options. */
type BorderStyle = "single" | "double" | "round" | "bold" | "singleDouble" | "doubleSingle" | "classic"

/** Props for the Box component. */
export interface BoxProps {
  /** Content inside the box. */
  children?: React.ReactNode
  /** Width of the box. Can be a number (columns) or a percentage string. */
  width?: number | string
  /** Height of the box in rows. */
  height?: number
  /** Padding on all sides. */
  padding?: number
  /** Horizontal padding (left and right). */
  paddingX?: number
  /** Vertical padding (top and bottom). */
  paddingY?: number
  /** Margin on all sides. */
  margin?: number
  /** Horizontal margin. */
  marginX?: number
  /** Vertical margin. */
  marginY?: number
  /** Flex direction. */
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
  /** Align items along the cross axis. */
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch"
  /** Justify content along the main axis. */
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
  /** Gap between children. */
  gap?: number
  /** Show border around the box. */
  borderStyle?: BorderStyle
  /** Border color. */
  borderColor?: string
}

/**
 * Layout container component.
 * Wraps Ink's Box with a cleaner interface for common layout patterns.
 *
 * @example
 * ```tsx
 * <Box padding={1} borderStyle="round" borderColor="cyan">
 *   <Text>Hello, terminal!</Text>
 * </Box>
 * ```
 */
export const Box: React.FC<BoxProps> = ({
  children,
  width,
  height,
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  flexDirection = "column",
  alignItems,
  justifyContent,
  gap,
  borderStyle,
  borderColor,
}) => {
  return (
    <InkBox
      width={width}
      height={height}
      paddingLeft={paddingX ?? padding}
      paddingRight={paddingX ?? padding}
      paddingTop={paddingY ?? padding}
      paddingBottom={paddingY ?? padding}
      marginLeft={marginX ?? margin}
      marginRight={marginX ?? margin}
      marginTop={marginY ?? margin}
      marginBottom={marginY ?? margin}
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      gap={gap}
      borderStyle={borderStyle}
      borderColor={borderColor}
    >
      {children}
    </InkBox>
  )
}

export default Box
