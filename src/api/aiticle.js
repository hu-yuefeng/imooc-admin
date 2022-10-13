import request from "@/utils/request";
// 获取所有文章
export const getArticleList = (data) => {
  return request({
    url: "/article/list",
    method: "get",
    params: data,
  });
};
// 修改文章排名
export const articleSort = (data) => {
  return request({
    url: "/article/sort",
    method: "post",
    data,
  });
};
