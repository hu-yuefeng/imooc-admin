import { MAIN_COLOR, DEFAULT_COLOR } from "@/constant";
import { getItem, setItem } from "@/utils/storage";
import variable from "../../styles/variables.module.scss";
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    getColor: variable,
  }),
  mutations: {
    setMainColor(state, newColor) {
      state.mainColor = newColor;
      state.getColor.menuBG = newColor;
      setItem(MAIN_COLOR, newColor);
    },
  },
};
