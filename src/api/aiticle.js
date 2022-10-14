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
// 文章删除
export const delArticle = (articleId) => {
  return request({
    url: `/article/delete/${articleId}`,
    method: "get",
  });
};
// 查看文章详情
export const articleDetail = (id) => {
  return request({
    url: `/article/${id}`,
    method: "get",
  });
};
// 创建文章
export const articleCreate = (data) => {
  return request({
    url: "/article/create",
    method: "post",
    data,
  });
};
// 编辑文章
export const articleEdit = (data) => {
  return request({
    url: "/article/edit",
    method: "post",
    data,
  });
};
