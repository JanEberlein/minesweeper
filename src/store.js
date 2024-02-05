import { reactive } from 'vue'

export const playingFieldDimension = reactive({
  columns: 8,
  rows: 8,
  obstacles: 10
})

export const cells = reactive({ data: newPlayingField() })

export function resetCells(rows = 8, columns = 8, obstacles = 10) {
  playingFieldDimension.columns = columns
  playingFieldDimension.rows = rows
  playingFieldDimension.obstacles = obstacles
  cells.data = newPlayingField()
}

function newPlayingField() {
  var arr = []
  var r = 0
  while (arr.length <= playingFieldDimension.obstacles) {
    console.log(arr)
    r = Math.floor(Math.random() * playingFieldDimension.rows * playingFieldDimension.columns)
    if (!arr.includes(r)) {
      arr.push(r)
    }
  }

  const field = Array.from(Array(playingFieldDimension.rows).keys()).map((r) =>
    Array.from(Array(playingFieldDimension.columns).keys()).map((c) =>
      reactive({
        key: r * playingFieldDimension.columns + c,
        revealed: false,
        marked: '',
        obstacle: (arr.includes(r * playingFieldDimension.columns + c))
      })
    )
  )

  return field
}
