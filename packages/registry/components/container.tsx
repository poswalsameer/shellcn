import React from "react"
import { Box } from "ink"

/** Border style options. */
type BorderStyle = "single" | "double" | "round" | "bold" | "singleDouble" | "doubleSingle" | "classic"

/** Border radius options mapping to terminal box styles. */
export type Radius = "none" | "round"

/** Props for the Container component. */
export interface ContainerProps {
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
  /** Left padding. */
  paddingLeft?: number
  /** Right padding. */
  paddingRight?: number
  /** Top padding. */
  paddingTop?: number
  /** Bottom padding. */
  paddingBottom?: number
  /** Margin on all sides. */
  margin?: number
  /** Horizontal margin. */
  marginX?: number
  /** Vertical margin. */
  marginY?: number
  /** Left margin. */
  marginLeft?: number
  /** Right margin. */
  marginRight?: number
  /** Top margin. */
  marginTop?: number
  /** Bottom margin. */
  marginBottom?: number
  /** Flex direction. */
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
  /** Align items along the cross axis. */
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch"
  /** Justify content along the main axis. */
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
  /** Gap between children. */
  gap?: number
  /** Show border around the container. */
  borderStyle?: BorderStyle
  /** Border radius. Maps to terminal box styles.
   * "none" uses square corners, others use rounded corners.
   */
  radius?: Radius
  /** Border color. */
  borderColor?: string
}

/**
 * Layout container component.
 * Wraps Ink's Box with a cleaner interface for common layout patterns.
 *
 * @example
 * ```tsx
 * <Container padding={1} radius="round" borderColor="cyan">
 *   <Text>Hello, terminal!</Text>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  width,
  height,
  padding,
  paddingX,
  paddingY,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  margin,
  marginX,
  marginY,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  flexDirection = "column",
  alignItems,
  justifyContent,
  gap,
  borderStyle,
  radius,
  borderColor,
}) => {
  const resolvedBorderStyle = radius
    ? (radius === "none" ? "single" : "round")
    : borderStyle

  return (
    <Box
      width={width}
      height={height}
      paddingLeft={paddingLeft ?? paddingX ?? padding}
      paddingRight={paddingRight ?? paddingX ?? padding}
      paddingTop={paddingTop ?? paddingY ?? padding}
      paddingBottom={paddingBottom ?? paddingY ?? padding}
      marginLeft={marginLeft ?? marginX ?? margin}
      marginRight={marginRight ?? marginX ?? margin}
      marginTop={marginTop ?? marginY ?? margin}
      marginBottom={marginBottom ?? marginY ?? margin}
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      gap={gap}
      borderStyle={resolvedBorderStyle}
      borderColor={borderColor}
    >
      {children}
    </Box>
  )
}

export default Container
