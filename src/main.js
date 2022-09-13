import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
// 初始化样式
import "@/styles/index.scss";
import installIcons from "@/icons";
import "./permission";

createApp(App)
  .use(store)
  .use(router)
  .use(installElementPlus)
  .use(installIcons)
  .mount("#app");
