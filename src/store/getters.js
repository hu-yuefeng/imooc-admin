import { generateColors } from "@/utils/theme";
import { MAIN_COLOR } from "@/constant";
import { getItem } from "@/utils/storage";
// import variable from "@/styles/variables.modules.scss";

// 快捷访问
const getters = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== "{}";
  },
  userInfo: (state) => state.user.userInfo,
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
  getColor: (state) => state.theme.getColor,
  cssVar: (state) => ({
    ...state.theme.getColor,
    ...generateColors(getItem(MAIN_COLOR)),
  }),
};
export default getters;
