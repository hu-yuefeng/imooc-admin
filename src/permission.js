import router from "./router";
import store from "./store";
// 路由前置守卫

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  // 1.用户已登录不允许进入login
  if (store.getters.token) {
    if (to.path === "/login") {
      next("/");
    } else {
      if (!store.getters.hasUserInfo) {
        await store.dispatch("user/getUserInfo");
      }
      next();
    }
  }
  // 2、用户未登录只允许进入login
  else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});
