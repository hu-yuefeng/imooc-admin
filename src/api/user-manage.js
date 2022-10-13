import request from "@/utils/request";
export const list = (data) => {
  return request({
    url: "/user-manage/list",
    method: "get",
    params: data,
  });
};
// 上传
export const userBatchImport = (data) => {
  return request({
    url: "/user-manage/batch/import",
    method: "post",
    data,
  });
};
// 删除员工
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`,
    method: "get",
  });
};
// 获取所有员工列表
export const getAllUser = () => {
  return request({
    url: "/user-manage/all-list",
    method: "get",
  });
};
// 获取员工详情
export const userDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`,
    method: "get",
  });
};
