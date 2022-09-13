// 快捷访问
const getters = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== "{}";
  },
  userInfo: (state) => state.user.userInfo,
  // cssVar: (state) => variables,
  sidebarOpened: (state) => state.app.sidebarOpened,
};
export default getters;
