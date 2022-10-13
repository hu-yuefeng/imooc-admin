import { publicRoutes, privateRoutes } from "@/router";
export default {
  namespaced: true,
  state: () => ({
    // 路由表
    routes: publicRoutes,
  }),
  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes];
    },
  },
  actions: {
    filterRoutes(context, menu) {
      // const routes = [];
      let routes = menu.map((item) => {
        return privateRoutes.find((v) => v.name === item);
      });
      // 所有不匹配的路由全部进入404的路由配置
      // 注意：该配置必须在所有路由指定之后
      routes.push({
        path: "/:catchAll(,*)",
        redirect: "/404",
      });

      context.commit("setRoutes", routes);

      return routes;
    },
  },
};
