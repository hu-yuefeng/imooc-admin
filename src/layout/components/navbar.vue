<template>
  <div class="navbar">
    <div class="left-group">
      <Hamburger class="left-menu" />
      <BreadCrumb class="breadcrumb-container" />
    </div>
    <div class="right-menu">
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
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <a href="#" target="__blank">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout"
              >退出登录</el-dropdown-item
            >
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
