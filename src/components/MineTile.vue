<script setup>
import { cells } from '@/store'

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

var obstaclesNearby = 0;
function getSurroundingCells(row, column) {

}

function revealCell(row, column) {
  cells.data[props.row][props.column].revealed = true
}

function rightClick(event) {
  event.preventDefault()
  switch (cells.data[props.row][props.column].marked) {
    case '🚩':
      cells.data[props.row][props.column].marked = '❓'
      break;
    case '':
      cells.data[props.row][props.column].marked = '🚩'
      break;
    default:
    cells.data[props.row][props.column].marked = ''
      break;
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center m-1 h-8 w-8 p-0 text-balance bg-slate-500 shadow-md shadow-slate-800 hover:m-0 hover:h-10 hover:w-10 hover:text-lg"
    @click="revealCell"
    @click.right="rightClick($event)"
  >
    <div v-if="cells.data[props.row][props.column].revealed">
      {{ cells.data[props.row][props.column].obstacle }}
    </div>
    <div v-else>
      {{ cells.data[props.row][props.column].marked }}
    </div>
  </div>
</template>
