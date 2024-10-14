import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './styles/index.scss'
import 'remixicon/fonts/remixicon.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
