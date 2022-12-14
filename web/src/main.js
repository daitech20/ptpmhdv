import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createPinia } from 'pinia'
import router from './routes'


const app = createApp(App)
app.use(createPinia())
app.use(Antd)
app.use(router)

app.mount('#app')