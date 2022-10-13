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
        const { permission } = (await store.dispatch("user/getUserInfo")).data;
        // console.log(permission);
        // 处理用户权限，筛选出需要添加的路由
        const filterRoutes = await store.dispatch(
          "permission/filterRoutes",
          permission.menus
        );
        // 循环添加动态路由
        filterRoutes.forEach((item) => {
          router.addRoute(item);
        });
        // 添加完动态路由，需要进行主动跳转
        return next(to.path);
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
