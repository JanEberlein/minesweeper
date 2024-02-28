<script setup>
import {
  playingFieldDimension as dim,
  newGame,
  gameOver,
  gameWon,
  countMarked,
  minDimension,
  maxDimension,
  clamp
} from '@/store'
import MineTile from './MineTile.vue'
import { ref, watch } from 'vue'

const columns = ref(dim.columns)
const rows = ref(dim.rows)
const obstacles = ref(dim.obstacles)

watch([rows, columns], () => {
  obstacles.value = clamp(1, obstacles.value, (rows.value * columns.value) / 2)
})
</script>

<template>
  <div class="flex flex-col sm:items-center justify-start min-h-screen">
    <div class="flex items-center sm:justify-center my-0.5 p-0.5">
      <div
        class="max-w-36 sm:max-w-none m-2.5 px-1 bg-slate-300 shadow-inner shadow-white border-r-2 border-b-2 border-slate-400"
      >
        <label for="rows" class="m-0.5">Rows</label>
        <input
          id="rows"
          type="number"
          :min="minDimension"
          :max="maxDimension"
          v-model="rows"
          class="m-0.5 p-0.5 w-12 bg-transparent"
        />
        <label for="columns" class="m-0.5">Columns</label>
        <input
          id="columns"
          type="number"
          :min="minDimension"
          :max="maxDimension"
          v-model="columns"
          class="m-0.5 p-0.5 w-12 bg-transparent"
        />
        <label for="obstacles" class="m-0.5">Obstacles</label>
        <input
          id="obstacles"
          type="number"
          min="1"
          :max="(rows * columns) / 2"
          v-model.number="obstacles"
          class="m-0.5 p-0.5 w-12 bg-transparent"
        />
      </div>
      <button
        class="self-center m-2 mx-4 px-2.5 py-1 hover:m-0 hover:mx-1.5 hover:text-xl text-balance bg-slate-300 shadow-inner shadow-white border-r-2 border-b-2 border-slate-400 active:shadow-slate-600 active:border-slate-200"
        @click="newGame(rows, columns, obstacles)"
      >
        New Game
      </button>
    </div>

    <div
      class="bg-slate-300 shadow-inner shadow-white border-r-2 border-b-2 border-slate-400 m-3 p-1 pr-2.5 w-fit"
    >
      <span class="drop-shadow-md saturate-200">🚩</span>:
      {{ Math.max(dim.obstacles - countMarked, 0) }}
    </div>

    <div class="overflow-x-scroll w-screen sm:w-auto p-2">
      <table
        class="table-auto bg-slate-200 border-separate p-0.5 m-1 shadow-inner shadow-white border-r-2 border-b-2 border-slate-300"
      >
        <tbody>
          <tr v-for="row in dim.rows" :key="row">
            <td v-for="column in dim.columns" :key="column">
              <MineTile :row="row - 1" :column="column - 1"></MineTile>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 v-if="gameWon" class="text-3xl font-bold w-full sm:text-center">Game Won 🎉</h1>
      <h1 v-else-if="gameOver" class="text-3xl font-bold w-full sm:text-center">Game Over!</h1>
    </div>
    <p class="grow"></p>
    <p class="text-sm text-slate-300">
      This is just some private project playing around witch vue and tailwind. I don't claim
      ownership of the idea.
    </p>
  </div>
</template>
