<script setup>
import { playingFieldDimension as dim, newGame, logCells, gameOver, gameWon } from '@/store'
import MineTile from './MineTile.vue'
import { ref } from 'vue'

const columns = ref(dim.columns)
const rows = ref(dim.rows)
const obstacles = ref(dim.obstacles)
</script>

<template>
  <div class="flex flex-col md:items-center justify-center">
    <div class="flex items-center md:justify-center m-0.5 p-0.5">
      <label for="rows" class="m-0.5">Rows</label>
      <input id="rows" type="number" min="1" max="100" v-model="rows" class="m-0.5 p-0.5 w-10" />
      <label for="columns" class="m-0.5">Columns</label>
      <input
        id="columns"
        type="number"
        min="1"
        max="100"
        v-model="columns"
        class="m-0.5 p-0.5 w-10"
      />
      <label for="obstacles" class="m-0.5">Obstacles</label>
      <input
        id="obstacles"
        type="number"
        min="1"
        max="100"
        v-model="obstacles"
        class="m-0.5 p-0.5 w-10"
      />
      <button class="m-0.5 p-0.5 bg-slate-400" @click="newGame(rows, columns, obstacles)">
        New Game
      </button>
      <button class="m-0.5 p-0.5 bg-slate-400" @click="logCells">Log Cells</button>
    </div>

    <div class="overflow-x-scroll w-screen md:w-auto p-2">
      <table class="table-auto">
        <tbody>
          <tr v-for="row in dim.rows" :key="row">
            <td v-for="column in dim.columns" :key="column">
              <MineTile :row="row - 1" :column="column - 1"></MineTile>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 v-if="gameWon" class="text-3xl font-bold w-full md:text-center">Game Won!</h1>
      <h1 v-else-if="gameOver" class="text-3xl font-bold w-full md:text-center">Game Over!</h1>
    </div>
  </div>
</template>
