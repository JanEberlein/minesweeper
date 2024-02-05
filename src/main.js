import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { resetCells } from './store'

resetCells()
createApp(App).mount('#app')
