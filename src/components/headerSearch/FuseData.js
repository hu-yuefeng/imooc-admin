import i18n from "@/i18n";
import path from "path-browserify";

export const generateRoutes = (routes, basePath = "/", prefixTitle = []) => {
  let res = [];
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle],
    };

    // 当前存在meta时，使用i8n解析国际化
    // 动态路由不允许被检索
    const re = /.*\/:.*/;
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`);
      data.title = [...data.title, i18nTitle];
      res.push(data);
    }
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title);
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes];
      }
    }
  }

  let map = new Map();
  for (let item of res) {
    if (!map.has(item.path)) {
      map.set(item.path, item);
    }
  }
  res = [...map.values()];

  return res;
};
