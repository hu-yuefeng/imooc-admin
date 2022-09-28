<template>
  <div class="navbar">
    <div class="left-group">
      <Hamburger class="left-menu" />
      <BreadCrumb id="guide-breadcrumb" class="breadcrumb-container" />
    </div>
    <div class="right-menu">
      <Guide class="right-menu-item hover-effect" />
      <HeaderSearch class="right-menu-item hover-effect" />
      <Screenfull class="right-menu-item hover-effect" />
      <ThemeChange class="right-menu-item hover-effect" />
      <LangSelect class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container">
        <div class="avator-warpper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dorpdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t("msg.navBar.home") }}</el-dropdown-item>
            </router-link>
            <a href="#" target="__blank">
              <el-dropdown-item>{{ $t("msg.navBar.course") }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{
              $t("msg.navBar.logout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from "vue";
import { useStore } from "vuex";
import Hamburger from "./hamburger/index.vue";
import BreadCrumb from "@/components/breadcrumb/index.vue";
import LangSelect from "@/components/langSelect";
import ThemeChange from "@/components/themeSelect";
import Screenfull from "@/components/screenfull";
import HeaderSearch from "@/components/headerSearch";
import Guide from "@/components/Guide";
const store = useStore();
const logout = () => {
  store.dispatch("user/logout");
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.88);
  .right-menu {
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 16px;
    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      vertical-align: text-bottom;
      color: #5a5e66;

      .hover-effect {
        cursor: pointer;
      }
    }
  }
  .left-menu {
    line-height: 46px;
    cursor: pointer;
    transition: background 0.5s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  ::v-deep .avatar-container {
    cursor: pointer;
    .avator-warpper {
      position: relative;
      margin-top: 5px;
      .el-avatar {
        --el-avatar-background-color: none;
      }
    }
  }
  .left-group {
    display: flex;
    align-items: center;
  }
}
</style>
