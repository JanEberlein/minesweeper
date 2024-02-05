import { reactive } from 'vue'

export const playingFieldDimension = reactive ({
  columns: 8,
  rows: 8
})

export const cells = reactive({data:
  Array.from(Array(playingFieldDimension.rows).keys()).map((r) =>
    Array.from(Array(playingFieldDimension.columns).keys()).map(
      (c) => r * playingFieldDimension.columns + c
    )
  )}
)

export function resetCells(columns = 8, rows = 8) {
  playingFieldDimension.columns = columns
  playingFieldDimension.rows = rows
  cells.data = Array.from(Array(playingFieldDimension.rows).keys()).map((r) =>
    Array.from(Array(playingFieldDimension.columns).keys()).map(
      (c) => r * playingFieldDimension.columns + c
    )
  )
}
