import store from "@/store";
import axios from "axios";
import { ElMessage } from "element-plus";
import { isCheckTimeout } from "@/utils/auth";
// import { useStore } from "vuex";

const service = axios.create(
  {
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
  }, // 请求失败
  (error) => {
    ElMessage.error(error);
    return Promise.reject(new Error(error));
  }
);

// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    if (isCheckTimeout()) {
      store.dispatch("user/logout");
      return Promise.reject(new Error("Token失效"));
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`;
  }
  // 添加 icode
  config.headers.icode = "34785B46B360B444";
  // 必须返回 config
  // 配置国际化语言
  config.headers["Accept-Language"] = store.getters.language;
  return config;
});
// 相应拦截器
service.interceptors.response.use(
  (response) => {
    const {
      data,
      data: { success, message },
    } = response;
    // 判断当前请求是否成功
    if (success) {
      // 成功返回解析后端数据
      return data;
    } else {
      // 失败（请求成功，业务失败），消息提示
      ElMessage.error(message);
      return Promise.reject(new Error(message));
    }
  },
  // 请求失败
  (error) => {
    // 处理token超时的问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch("user/logout");
    }
    ElMessage.error(error.message);
    return Promise.reject(new Error(error));
  }
);
export default service;
