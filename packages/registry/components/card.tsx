import React from "react"
import { Text, type TextProps } from "./text.js"
import { Container, type ContainerProps } from "./container.js"

/** Border radius options mapping to terminal box styles. */
export type Radius = "none" | "round"

/** Props for the Card component. */
export interface CardProps extends ContainerProps {
  /** Content of the card body. */
  children: React.ReactNode
  /**
   * Border radius. Maps to terminal box styles.
   * "none" uses square corners, others use rounded corners.
   */
  radius?: Radius
}

/**
 * Card container component.
 * A bordered container meant to compose with CardTitle and CardFooter.
 *
 * @example
 * ```tsx
 * <Card borderColor="cyan" radius="round">
 *   <CardTitle color="cyan">System Info</CardTitle>
 *   <Text>CPU: 45%</Text>
 *   <Text>Memory: 2.1 GB</Text>
 *   <CardFooter>Last updated: now</CardFooter>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  radius = "none",
  borderColor = "white",
  paddingX = 1,
  ...props
}) => {
  return (
    <Container
      flexDirection="column"
      radius={radius}
      borderColor={borderColor}
      paddingX={paddingX}
      {...props}
    >
      {children}
    </Container>
  )
}

/** Props for CardTitle, extending Text properties. */
export interface CardTitleProps extends Omit<TextProps, "children"> {
  children?: React.ReactNode
}

/**
 * Card Title component.
 * Renders bold text with a bottom margin.
 */
export const CardTitle: React.FC<CardTitleProps> = ({ children, ...props }) => {
  return (
    <Container marginBottom={1}>
      <Text bold color="white" {...props}>
        {children}
      </Text>
    </Container>
  )
}

/** Props for CardFooter, extending Text properties. */
export interface CardFooterProps extends Omit<TextProps, "children"> {
  children?: React.ReactNode
}

/**
 * Card Footer component.
 * Renders dimmed text with a top margin.
 */
export const CardFooter: React.FC<CardFooterProps> = ({ children, ...props }) => {
  return (
    <Container marginTop={1}>
      <Text dimmed {...props}>
        {children}
      </Text>
    </Container>
  )
}

export default Card
