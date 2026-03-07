import React from "react"
import { Text, Box } from "ink"

/** Column alignment options. */
type ColumnAlign = "left" | "right" | "center"

/** Configuration for a single table column. */
export interface ColumnConfig {
  /** Column header text. */
  header: string
  /** Key to extract value from row data. */
  accessor: string
  /** Column width in characters. Auto-calculated if omitted. */
  width?: number
  /** Text alignment within the column. */
  align?: ColumnAlign
}

/** Props for the Table component. */
export interface TableProps {
  /** Column definitions. */
  columns: ColumnConfig[]
  /** Array of row data objects. */
  data: Record<string, string | number>[]
  /** Border color for the table frame. */
  borderColor?: string
  /** Color of the header text. */
  headerColor?: string
  /** Color of the row text. */
  cellColor?: string
  /** Add horizontal padding to each cell. */
  cellPadding?: number
}

/**
 * Pads or truncates a string to a fixed width with alignment.
 */
function alignText(text: string, width: number, align: ColumnAlign): string {
  const truncated = text.length > width ? text.slice(0, width - 1) + "…" : text
  const padding = width - truncated.length

  switch (align) {
    case "right":
      return " ".repeat(padding) + truncated
    case "center": {
      const left = Math.floor(padding / 2)
      const right = padding - left
      return " ".repeat(left) + truncated + " ".repeat(right)
    }
    default:
      return truncated + " ".repeat(padding)
  }
}

/**
 * Data table component.
 * Renders tabular data with headers, column alignment, and borders.
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { header: "Name", accessor: "name", width: 20 },
 *     { header: "Status", accessor: "status", width: 12, align: "center" },
 *   ]}
 *   data={[
 *     { name: "Task 1", status: "done" },
 *     { name: "Task 2", status: "pending" },
 *   ]}
 * />
 * ```
 */
export const Table: React.FC<TableProps> = ({
  columns,
  data,
  borderColor = "gray",
  headerColor = "white",
  cellColor,
  cellPadding = 1,
}) => {
  // Calculate column widths if not specified
  const resolvedColumns = columns.map((col) => {
    if (col.width) return col
    const maxDataLen = Math.max(
      col.header.length,
      ...data.map((row) => String(row[col.accessor] ?? "").length)
    )
    return { ...col, width: maxDataLen + cellPadding * 2 }
  })

  const pad = " ".repeat(cellPadding)
  const totalWidth = resolvedColumns.reduce((sum, col) => sum + (col.width ?? 10) + cellPadding * 2 + 1, 0) + 1
  const horizontalLine = "─".repeat(totalWidth - 2)

  return (
    <Box flexDirection="column">
      {/* Top border */}
      <Text color={borderColor}>┌{horizontalLine}┐</Text>

      {/* Header row */}
      <Text>
        <Text color={borderColor}>│</Text>
        {resolvedColumns.map((col, i) => (
          <React.Fragment key={i}>
            <Text color={headerColor} bold>
              {pad}{alignText(col.header, col.width ?? 10, col.align ?? "left")}{pad}
            </Text>
            <Text color={borderColor}>│</Text>
          </React.Fragment>
        ))}
      </Text>

      {/* Header separator */}
      <Text color={borderColor}>├{horizontalLine}┤</Text>

      {/* Data rows */}
      {data.map((row, rowIndex) => (
        <Text key={rowIndex}>
          <Text color={borderColor}>│</Text>
          {resolvedColumns.map((col, colIndex) => (
            <React.Fragment key={colIndex}>
              <Text color={cellColor}>
                {pad}{alignText(String(row[col.accessor] ?? ""), col.width ?? 10, col.align ?? "left")}{pad}
              </Text>
              <Text color={borderColor}>│</Text>
            </React.Fragment>
          ))}
        </Text>
      ))}

      {/* Bottom border */}
      <Text color={borderColor}>└{horizontalLine}┘</Text>
    </Box>
  )
}

export default Table
