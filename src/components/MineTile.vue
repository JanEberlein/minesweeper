<script setup>
import { cellRevealed, countMarked, gameOver, getCell } from '@/store'
import { computed } from 'vue'

const props = defineProps({
  row: {
    type: Number,
    required: true
  },
  column: {
    type: Number,
    required: true
  }
})

const cell = getCell(props.row, props.column)

function revealCell() {
  if (gameOver.value) return
  if (cell.value.marked == '🚩') return

  cellRevealed(props.row, props.column)
}

function markCell() {
  if (gameOver.value) return
  if (cell.value.revealed) return
  switch (cell.value.marked) {
    case '':
      cell.value.marked = '🚩'
      countMarked.value++
      break
    case '🚩':
      cell.value.marked = '❓'
      countMarked.value--
      break
    default:
      cell.value.marked = ''
      break
  }
}

const cellContent = computed(() => {
  if (cell.value.marked != '') return cell.value.marked
  else if (cell.value.revealed && cell.value.obstacle) return '💣'
  else if (gameOver.value && cell.value.obstacle) return '💣'
  else if (cell.value.revealed && cell.value.surroundingObstacles > 0)
    return cell.value.surroundingObstacles
  else return ''
})
</script>

<template>
  <div
    class="flex items-center justify-center m-1 h-8 w-8 p-0 shadow-inner text-balance text-lg hover:m-0 hover:h-10 hover:w-10 hover:text-2xl"
    :class="{
      'bg-red-500':
        gameOver && ((cell.revealed && cell.obstacle) || (cell.marked == '🚩' && !cell.obstacle)),
      'bg-slate-300': !(
        (gameOver && cell.revealed && cell.obstacle) ||
        (cell.marked == '🚩' && !cell.obstacle)
      ),
      'shadow-slate-600 border-r-2 border-b-2 border-slate-200': cell.revealed,
      'shadow-white border-r-2 border-b-2 border-slate-400': !cell.revealed
    }"
    v-touch:longtap="markCell"
    @click="revealCell"
    @click.right.prevent="markCell"
  >
    <div class="drop-shadow-md saturate-200">
      {{ cellContent }}
    </div>
  </div>
</template>
