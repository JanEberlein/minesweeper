import { computed, reactive, readonly, ref } from 'vue'

const dimensions = reactive({
  columns: 8,
  rows: 8,
  obstacles: 10
})

const cells = reactive({ data: newPlayingField() })

export const playingFieldDimension = readonly(dimensions)
export const gameOver = ref(false)
export const gameActive = ref(false)

export function getCell(row, column) {
  return computed(() => {
    return cells.data[row][column]
  })
}

export function newGame(rows = 8, columns = 8, obstacles = 10) {
  gameActive.value = false
  gameOver.value = false
  dimensions.columns = columns
  dimensions.rows = rows
  dimensions.obstacles = obstacles
  cells.data = newPlayingField()
}

function newPlayingField() {
  var arr = []
  var r = 0
  while (arr.length <= dimensions.obstacles) {
    console.log(arr)
    r = Math.floor(Math.random() * dimensions.rows * dimensions.columns)
    if (!arr.includes(r)) {
      arr.push(r)
    }
  }

  const field = Array.from(Array(dimensions.rows).keys()).map((r) =>
    Array.from(Array(dimensions.columns).keys()).map((c) =>
      reactive({
        key: r * dimensions.columns + c,
        revealed: false,
        marked: '',
        obstacle: arr.includes(r * dimensions.columns + c)
      })
    )
  )

  return field
}

export function logCells() {
  console.log(cells)
}
