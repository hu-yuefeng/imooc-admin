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
