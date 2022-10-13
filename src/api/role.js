import request from "@/utils/request";
// 获取所有角色
export const roleList = () => {
  return request({
    url: "/role/list",
    method: "get",
  });
};

// 获取所有权限
export const permissionList = () => {
  return request({
    url: "/permission/list",
    method: "get",
  });
};
// 员工分配角色
export const roleChange = (userId, roles) => {
  return request({
    url: `/user-manage/update-role/${userId}`,
    method: "post",
    data: {
      roles,
    },
  });
};
// 获取指定角色的权限
export const rolePermission = (userId) => {
  return request({
    url: `/role/permission/${userId}`,
    method: "get",
  });
};
// 为角色分配权限
export const distributePermission = (data) => {
  return request({
    url: "/role/distribute-permission",
    method: "post",
    data,
  });
};
