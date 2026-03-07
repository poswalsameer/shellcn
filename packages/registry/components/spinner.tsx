import React, { useState, useEffect } from "react"
import { Text } from "ink"

/** Built-in spinner frame sets. */
const SPINNER_FRAMES: Record<string, string[]> = {
  dots: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  line: ["-", "\\", "|", "/"],
  arc: ["◜", "◠", "◝", "◞", "◡", "◟"],
  bounce: ["⠁", "⠂", "⠄", "⠂"],
  circle: ["◐", "◓", "◑", "◒"],
}

/** Props for the Spinner component. */
export interface SpinnerProps {
  /** Label text displayed next to the spinner. */
  label?: string
  /** Color of the spinner characters. */
  color?: string
  /** Color of the label text. */
  labelColor?: string
  /** Spinner style preset name or custom frames array. */
  type?: keyof typeof SPINNER_FRAMES
  /** Custom frames to use instead of a preset. */
  frames?: string[]
  /** Animation interval in milliseconds. */
  interval?: number
}

/**
 * Animated loading spinner.
 * Cycles through frames to indicate loading or processing.
 *
 * @example
 * ```tsx
 * <Spinner label="Loading..." color="cyan" />
 * <Spinner type="arc" label="Processing" />
 * <Spinner frames={["🌑", "🌒", "🌓", "🌔", "🌕"]} label="Moonwalk" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  label,
  color = "cyan",
  labelColor,
  type = "dots",
  frames: customFrames,
  interval = 80,
}) => {
  const [frameIndex, setFrameIndex] = useState(0)
  const frames = customFrames ?? SPINNER_FRAMES[type] ?? SPINNER_FRAMES.dots

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length)
    }, interval)

    return () => clearInterval(timer)
  }, [frames.length, interval])

  return (
    <Text>
      <Text color={color}>{frames[frameIndex]}</Text>
      {label && <Text color={labelColor}> {label}</Text>}
    </Text>
  )
}

export default Spinner
