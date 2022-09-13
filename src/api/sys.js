import request from "@/utils/request";

// 登录
export const login = (data) => {
  return request({
    url: "/sys/login",
    method: "post",
    data,
  });
};

// 获取用户信息
export const getUserInfo = (data) => {
  return request({
    url: "/sys/profile",
    method: "get",
    data,
  });
};
