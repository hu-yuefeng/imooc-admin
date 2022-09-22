<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      ></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        imooc-admin
      </h1>
    </div>
    <el-scrollbar><SideBarMenu /></el-scrollbar>
  </div>
</template>

<script setup>
import SideBarMenu from "@/layout/components/sidebar/sidebarMenu";
import {} from "vue";
const logoHeight = 44;
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + "px";
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 22px 0;
  .logo-title {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-left: 10px;
    white-space: nowrap;
  }
  .el-avatar {
    --el-avatar-background-color: none;
  }
}
</style>
