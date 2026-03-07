import React from "react"
import { Text, Box } from "ink"

/** Props for the Progress component. */
export interface ProgressProps {
  /** Current progress value between 0 and 1. */
  value: number
  /** Total width of the progress bar in columns. */
  width?: number
  /** Character used for the filled portion. */
  fillChar?: string
  /** Character used for the empty portion. */
  emptyChar?: string
  /** Color of the filled portion. */
  color?: string
  /** Color of the empty portion. */
  emptyColor?: string
  /** Show percentage label next to the bar. */
  showPercentage?: boolean
  /** Optional label displayed before the bar. */
  label?: string
}

/**
 * Progress bar component.
 * Displays a horizontal bar indicating completion progress.
 *
 * @example
 * ```tsx
 * <Progress value={0.65} color="green" showPercentage />
 * <Progress value={0.3} width={40} fillChar="█" emptyChar="░" />
 * ```
 */
export const Progress: React.FC<ProgressProps> = ({
  value,
  width = 30,
  fillChar = "█",
  emptyChar = "░",
  color = "green",
  emptyColor = "gray",
  showPercentage = true,
  label,
}) => {
  // Clamp value between 0 and 1
  const clamped = Math.min(1, Math.max(0, value))
  const filled = Math.round(clamped * width)
  const empty = width - filled
  const percentage = Math.round(clamped * 100)

  return (
    <Box flexDirection="row" gap={1}>
      {label && <Text>{label}</Text>}
      <Text>
        <Text color={color}>{fillChar.repeat(filled)}</Text>
        <Text color={emptyColor}>{emptyChar.repeat(empty)}</Text>
      </Text>
      {showPercentage && <Text dimColor>{percentage}%</Text>}
    </Box>
  )
}

export default Progress
