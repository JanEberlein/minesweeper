import { computed, reactive, readonly, ref, watch } from 'vue'

const dimensions = reactive({
  columns: 8,
  rows: 8,
  obstacles: 10
})
export const minDimension = 4
export const maxDimension = 100

const cells = reactive({ data: newPlayingField() })

export const playingFieldDimension = readonly(dimensions)
export const gameOver = ref(false)
export const gameWon = ref(false)
export const gameActive = ref(false)
export const countMarked = ref(0)
export const countRevealed = ref(0)

watch(countRevealed, () => {
  console.log(
    'marked: ' +
      countMarked.value +
      ', revealed: ' +
      countRevealed.value +
      ', total: ' +
      (countRevealed.value + countMarked.value)
  )
  if (dimensions.obstacles + countRevealed.value == dimensions.rows * dimensions.columns) {
    gameWon.value = true
    gameOver.value = true
  }
})

export function getCell(row, column) {
  return computed(() => {
    return cells.data[row][column]
  })
}

export async function cellRevealed(row, column) {
  const cell = getCell(row, column)
  if (cell.value.revealed) return
  cell.value.revealed = true
  countRevealed.value++

  if (cell.value.marked) countMarked.value--
  cell.value.marked = ''

  if (!gameActive.value) {
    await startGame(cell)
  } else if (cell.value.obstacle) {
    setGameOver()
    return
  }

  if (cell.value.surroundingObstacles == 0) {
    for (const [neighborRow, neighborColumn] of getSurroundingCoords(row, column)) {
      if (!getCell(neighborRow, neighborColumn).value.revealed) {
        cellRevealed(neighborRow, neighborColumn)
      }
    }
  }
}

function getSurroundingCoords(row, column) {
  let result = []
  for (let r = Math.max(0, row - 1); r <= Math.min(dimensions.rows - 1, row + 1); r++) {
    for (let c = Math.max(0, column - 1); c <= Math.min(dimensions.columns - 1, column + 1); c++) {
      if (!(r == row && c == column)) result.push([r, c])
    }
  }
  return result
}

export function newGame(rows = 8, columns = 8, obstacles = 10) {
  gameActive.value = false
  gameOver.value = false
  gameWon.value = false

  dimensions.columns = clamp(minDimension, columns, maxDimension)
  dimensions.rows = clamp(minDimension, rows, maxDimension)
  dimensions.obstacles = clamp(1, obstacles, (dimensions.columns * dimensions.rows) / 2)

  countMarked.value = 0
  countRevealed.value = 0
  cells.data = newPlayingField()
}

function newPlayingField() {
  const field = Array.from(Array(dimensions.rows).keys()).map((r) =>
    Array.from(Array(dimensions.columns).keys()).map((c) =>
      reactive({
        key: r * dimensions.columns + c,
        revealed: false,
        marked: '',
        obstacle: false,
        surroundingObstacles: 0
      })
    )
  )
  return field
}

async function startGame(cell) {
  gameActive.value = true
  distributeObstacles(cell.value.key)
}

async function distributeObstacles(firstRevealedCellKey) {
  var obstacleLocations = []
  var random = 0
  while (obstacleLocations.length < dimensions.obstacles) {
    random = Math.floor(Math.random() * dimensions.rows * dimensions.columns)
    if (!obstacleLocations.includes(random) && random != firstRevealedCellKey) {
      obstacleLocations.push(random)
    }
  }

  for (const locationKey of obstacleLocations) {
    const locationRow = Math.floor(locationKey / dimensions.columns)
    const locationColumn = locationKey % dimensions.columns

    getCell(locationRow, locationColumn).value.obstacle = true
    for (const [neighborRow, neighborColumn] of getSurroundingCoords(locationRow, locationColumn)) {
      getCell(neighborRow, neighborColumn).value.surroundingObstacles++
    }
  }
}

function setGameOver() {
  gameOver.value = true
}

export function clamp(lowerLimit, value, upperLimit) {
  return Math.max(lowerLimit, Math.min(value, upperLimit))
}
