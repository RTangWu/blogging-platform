import { createApp } from 'vue'
import App from './views/pages/App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'


createApp(App).use(router).mount('#app')
