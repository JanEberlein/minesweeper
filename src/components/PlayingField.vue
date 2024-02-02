<script setup>
import { playingFieldDimension as dim, resetCells } from '@/store'
import MineTile from './MineTile.vue'
import { ref } from 'vue'

const columns = ref(dim.columns)
const rows = ref(dim.rows)
const obstacles = ref(10)
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center justify-center m-0.5 p-0.5">
      <label for="rows" class="m-0.5">Rows</label>
      <input id="rows" type="number" v-model="rows" class="m-0.5 p-0.5 w-10" />
      <label for="columns" class="m-0.5">Columns</label>
      <input id="columns" type="number" v-model="columns" class="m-0.5 p-0.5 w-10" />
      <label for="obstacles" class="m-0.5">Obstacles</label>
      <input id="obstacles" type="number" v-model="obstacles" class="m-0.5 p-0.5 w-10" />
      <button class="m-0.5 p-0.5 bg-slate-400" @click="resetCells(columns, rows)">Neues Spielfeld</button>
    </div>

    <table class="table-fixed">
      <tbody>
        <tr v-for="row in dim.rows" :key="row">
          <td v-for="column in dim.columns" :key="column">
            <MineTile :row="row - 1" :column="column - 1"></MineTile>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
