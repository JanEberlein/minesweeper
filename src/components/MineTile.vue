<script setup>
import { cells } from '@/store'

defineProps({
  row: {
    type: Number,
    required: true
  },
  column: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div
    class="flex items-center justify-center m-1 h-8 w-8 p-0 text-balance bg-slate-500 shadow-md shadow-slate-800 hover:m-0 hover:h-10 hover:w-10 hover:text-lg"
  >
    {{ cells.data[row][column] }}
  </div>
</template>
