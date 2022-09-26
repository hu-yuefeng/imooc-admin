<template>
  <div class="app-main">
    <!-- 带有切换动画，并且具备组建缓存的 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { isTags } from "@/utils/tags";
import { useStore } from "vuex";
import { generateTitle, watchSwitchLang } from "@/utils/i18n";

const route = useRoute();
const store = useStore();

watchSwitchLang(() => {
  store.getters.tagsViewList.map((route, index) => {
    store.commit("app/changeTagsView", {
      index,
      tag: {
        ...route,
        title: getTitle(route),
      },
    });
  });
});
const getTitle = (route) => {
  let title = "";
  if (!route.meta) {
    const pathArr = route.path.split("/");
    title = pathArr[pathArr.length - 1];
  } else {
    title = generateTitle(route.meta.title);
  }
  return title;
};
watch(
  route,
  (to, from) => {
    if (!isTags()) return;
    const { fullPath, name, meta, parmas, query, path } = to;
    store.commit("app/addTagViewList", {
      fullPath,
      name,
      parmas,
      path,
      query,
      meta,
      title: getTitle(to),
    });
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.app-main {
  max-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
