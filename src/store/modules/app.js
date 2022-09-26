import { getItem, setItem } from "@/utils/storage";
import { LANG, TAGS_VIEW } from "@/constant";

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || "zh",
    tagsViewList: JSON.parse(getItem(TAGS_VIEW)) || [],
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    setLanguage(state, lang) {
      setItem(LANG, lang);
      state.language = lang;
    },
    /**
     * 初始化 tagsList
     */
    initTagsViewList(state) {
      state.tagsViewList = [];
    },
    addTagViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path;
      });
      if (!isFind) {
        state.tagsViewList.push(tag);
        setItem(TAGS_VIEW, JSON.stringify(state.tagsViewList));
      }
    },
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag;
      setItem(TAGS_VIEW, JSON.stringify(state.tagsViewList));
    },
    /* @param {type:other right index'} */
    removeTagsView(state, payload) {
      if (payload.type === "index") {
        state.tagsViewList.splice(payload.index, 1);
      } else if (payload.type === "right") {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        );
      } else if (payload.type === "other") {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        );
        state.tagsViewList.splice(0, payload.index);
      }
      setItem(TAGS_VIEW, JSON.stringify(state.tagsViewList));
    },
  },
};
