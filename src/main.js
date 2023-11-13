import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import './mock/index.js'
import globalComponents from "./tool/globalComponents";

const app = createApp(App)
app.use(store).use(router).use(ElementPlus,{locale:zhCn}).use(globalComponents).mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}