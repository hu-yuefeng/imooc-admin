<template>
  <div
    class="app-warpper"
    :class="[$store.getters.sidebarOpened ? 'sideberOpen' : 'hideSidebar']"
  >
    <!-- 左侧menu -->
    <SideBar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{
        backgroundColor: $store.getters.cssVar.menuBg,
      }"
    />
    <div class="main-container">
      <div class="fixed-head">
        <NavBar />
        <TagsViewList id="guide-tags" class="tags" />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import NavBar from "./components/navbar.vue";
import SideBar from "./components/sidebar";
import AppMain from "./components/AppMain.vue";
import variables from "@/styles/variables.module.scss";
import TagsViewList from "@/components/tagsView";

import {} from "vue";
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.module.scss";
.app-warpper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
}
.fixed-head {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}
.hideSidebar .fixed-head {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
