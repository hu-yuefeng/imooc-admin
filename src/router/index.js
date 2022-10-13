import { createRouter, createWebHistory } from "vue-router";
import layout from "@/layout";
import UserManageRouter from "./modules/UserManage";
import RoleListRouter from "./modules/RoleList";
import PermissionListRouter from "./modules/PermissionList";
import ArticleRouter from "./modules/Article";
import ArticleCreaterRouter from "./modules/ArticleCreate";
import store from "@/store";

/**
 * 私有路由表
 */
export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreaterRouter,
  // {
  //   path: "/article",
  //   component: layout,
  //   redirect: "/article/ranking",
  //   name: "articleRanking",
  //   meta: { title: "article", icon: "article" },
  //   children: [
  //     {
  //       path: "/article/ranking",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "article-ranking" */ "@/views/article-ranking/index"
  //         ),
  //       meta: {
  //         title: "articleRanking",
  //         icon: "article-ranking",
  //       },
  //     },
  //     {
  //       path: "/article/:id",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "article-ranking" */ "@/views/article-detail/index"
  //         ),
  //       meta: {
  //         title: "articleDetail",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/article",
  //   component: layout,
  //   redirect: "/article/ranking",
  //   name: "articleCreate",
  //   meta: { title: "article", icon: "article" },
  //   children: [
  //     {
  //       path: "/article/create",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "article-create" */ "@/views/article-create/index"
  //         ),
  //       meta: {
  //         title: "articleCreate",
  //         icon: "article-create",
  //       },
  //     },
  //     {
  //       path: "/article/editor/:id",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "article-create" */ "@/views/article-create/index"
  //         ),
  //       meta: {
  //         title: "articleEditor",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/user",
  //   component: layout,
  //   redirect: "/user/manage",
  //   name: "permissionList",
  //   meta: { title: "user", icon: "personnel" },
  //   children: [
  //     {
  //       path: "/user/permission",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "permission-list" */ "@/views/permission-list/index"
  //         ),
  //       meta: {
  //         title: "permissionList",
  //         icon: "permission",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/user",
  //   component: layout,
  //   redirect: "/user/manage",
  //   name: "roleList",
  //   meta: {
  //     title: "user",
  //     icon: "personnel",
  //   },
  //   children: [
  //     {
  //       path: "/user/role",
  //       component: () =>
  //         import(/* webpackChunkName: "role-list" */ "@/views/role-list/index"),
  //       meta: {
  //         title: "roleList",
  //         icon: "role",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/user",
  //   component: layout,
  //   redirect: "/user/manage",
  //   name: "userManage",
  //   meta: {
  //     title: "user",
  //     icon: "personnel",
  //   },
  //   children: [
  //     {
  //       path: "/user/manage",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "user-manage" */ "@/views/user-manage/index"
  //         ),
  //       meta: {
  //         title: "userManage",
  //         icon: "personnel-manage",
  //       },
  //     },
  //     {
  //       path: "/user/info/:id",
  //       name: "userInfo",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "user-manage" */ "@/views/user-info/index"
  //         ),
  //       props: true,
  //       meta: {
  //         title: "userInfo",
  //       },
  //     },
  //     {
  //       path: "/user/import",
  //       name: "import",
  //       component: () =>
  //         import(/* webpackChunkName: "user-manage" */ "@/views/import/index"),
  //       meta: {
  //         title: "excelImport",
  //       },
  //     },
  //   ],
  // },
];

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue"),
  },
  {
    path: "/",
    redirect: "/profile",
    component: () => import("../layout/index.vue"),
    children: [
      // 个人中心
      {
        path: "/profile",
        name: "Profile",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/profile"),
        meta: {
          title: "profile",
          icon: "el-icon-user",
        },
      },
      // 404
      {
        path: "/404",
        name: "404",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/error-page/404.vue"),
      },
      // 401
      {
        path: "/401",
        name: "401",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/error-page/401.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes,
});

export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus;
    menus.forEach((item) => {
      router.removeRoute(item);
    });
  }
}

export default router;
