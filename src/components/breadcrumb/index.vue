<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbData"
        :key="item.path"
      >
        <span class="no-redirect" v-if="index === breadCrumbData.length - 1">
          {{ generateTitle(item.meta.title) }}
        </span>
        <span class="redirect" @click="onLickClick(item)" v-else>{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { generateTitle } from "@/utils/i18n.js";
const route = useRoute();
const breadCrumbData = ref([]);
const getBreadCrumbData = () => {
  breadCrumbData.value = route.matched.filter((item) => {
    return item.meta && item.meta.title;
  });
};
// 监听路由变化
watch(
  route,
  () => {
    getBreadCrumbData();
  },
  {
    immediate: true,
  }
);
const router = useRouter();
const onLickClick = (item) => {
  router.push(item.path);
};
</script>

<style lang="scss" scoped>
::v-deep .no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  cursor: pointer;
  color: #666;
  font-weight: 600;
}
.redirect:hover {
  color: #304156;
}
</style>
