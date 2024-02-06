<script setup>
import { cells } from '@/store'
import { computed } from 'vue';

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


const cell = computed(() => {return cells.data[props.row][props.column]})

var obstaclesNearby = 0;
function getSurroundingCells(row, column) {

}

function revealCell(row, column) {
  cell.value.revealed = true
}

function markCell() {
  switch (cell.value.marked) {
    case '🚩':
      cell.value.marked = '❓'
      break;
    case '':
      cell.value.marked = '🚩'
      break;
    default:
      cell.value.marked = ''
      break;
  }
}

</script>

<template>
  <div
    class="flex items-center justify-center m-1 h-8 w-8 p-0 text-balance bg-slate-500 shadow-md shadow-slate-800 hover:m-0 hover:h-10 hover:w-10 hover:text-lg"
    @click="revealCell"
    @click.right.prevent="markCell"
  >
    <div v-if="cell.revealed">
      {{ cell.obstacle }}
    </div>
    <div v-else>
      {{ cell.marked }}
    </div>
  </div>
</template>
