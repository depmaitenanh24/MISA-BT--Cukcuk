import { createApp } from 'vue'
import App from './App.vue'
import ClickOutSide from "./js/Event/ClickOutSide";

const app = createApp(App)
app.directive('click-outside', ClickOutSide)

app.mount('#app')