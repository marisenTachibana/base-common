import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mitt from '@/utils/mitt';
import router from './router'
import {createPinia} from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import useStore from '@/init/store'

const app = createApp(App);
//导入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
    .use(createPinia())
    .use(router)

app.config.globalProperties.$mitt = mitt()
app.config.globalProperties.$store = useStore()
app.config.globalProperties.$loaded = useStore().common.loaded

app.mount('#app')