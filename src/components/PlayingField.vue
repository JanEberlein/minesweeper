<script setup>
import { playingFieldDimension as dim, newGame, gameOver, gameWon, countMarked } from '@/store'
import MineTile from './MineTile.vue'
import { ref } from 'vue'

const columns = ref(dim.columns)
const rows = ref(dim.rows)
const obstacles = ref(dim.obstacles)
</script>

<template>
  <div class="flex flex-col md:items-center justify-center">
    <div class="flex items-center md:justify-center my-0.5 p-0.5">
      <div class="m-2.5 px-1 bg-slate-300 shadow-inner shadow-white border-r-2 border-b-2 border-slate-400">
        <label for="rows" class="m-0.5">Rows</label>
        <input id="rows" type="number" min="1" max="100" v-model="rows" class="m-0.5 p-0.5 w-10 bg-transparent" />
        <label for="columns" class="m-0.5">Columns</label>
        <input
          id="columns"
          type="number"
          min="1"
          max="100"
          v-model="columns"
          class="m-0.5 p-0.5 w-10 bg-transparent"
        />
        <label for="obstacles" class="m-0.5">Obstacles</label>
        <input
          id="obstacles"
          type="number"
          min="1"
          max="100"
          v-model="obstacles"
          class="m-0.5 p-0.5 w-10 bg-transparent"
        />
      </div>  
      <button class="m-1.5 px-2.5 py-1 hover:m-0 hover:py-1 hover:text-xl text-balance bg-slate-300 shadow-inner shadow-white border-r-2 border-b-2 border-slate-400 active:shadow-slate-600 active:border-slate-200" 
        @click="newGame(rows, columns, obstacles)">
        New Game
      </button>
    </div>

    <div class="bg-slate-300 shadow-inner shadow-white border-r-2 border-b-2 border-slate-400 m-3 p-1 pr-2.5 w-fit ">
      <span class="drop-shadow-md saturate-200">🚩</span>: {{ Math.max(dim.obstacles - countMarked, 0) }}
    </div>

    <div class="overflow-x-scroll w-screen md:w-auto p-2">
      <table class="table-auto bg-slate-200 border-separate p-0.5 m-1 shadow-inner shadow-white border-r-2 border-b-2 border-slate-300">
        <tbody>
          <tr v-for="row in dim.rows" :key="row">
            <td v-for="column in dim.columns" :key="column">
              <MineTile :row="row - 1" :column="column - 1"></MineTile>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 v-if="gameWon" class="text-3xl font-bold w-full md:text-center">Game Won 🎉</h1>
      <h1 v-else-if="gameOver" class="text-3xl font-bold w-full md:text-center">Game Over!</h1>
    </div>
  </div>
</template>
