<template>
  <el-menu
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
  >
    <!-- 子集menu -->
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup>
import { computed, ref } from "vue";
import variables from "@/styles/variables.module.scss";
import { useRouter, useRoute } from "vue-router";
import { filterRouters, generateMenus } from "@/utils/route.js";
import SidebarItem from "../sidebarItem/index.vue";

const router = useRouter();
const resRoutes = computed(() => {
  const fRoutes = filterRouters(router.getRoutes());
  return generateMenus(fRoutes);
});

const routes = resRoutes.value;
// 默认激活项
const route = useRoute();
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="scss" scoped></style>
