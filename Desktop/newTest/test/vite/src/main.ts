import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import './bem.scss'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia';



const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(ElementPlus)
app.use(ElementPlus, {
  locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)


app.mount('#app')
// createApp(App).use(router).mount('#app')
