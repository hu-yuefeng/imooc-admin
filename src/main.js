import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import i18n from "@/i18n";
// 初始化样式
import "@/styles/index.scss";
import installIcons from "@/icons";
import "./permission";
// 全剧属性
import installFilter from "@/filters";
// 指令
import installDirective from "@/directives";
const app = createApp(App);
installFilter(app);
installDirective(app);
app
  .use(store)
  .use(router)
  .use(installElementPlus)
  .use(installIcons)
  .use(i18n)
  .mount("#app");
