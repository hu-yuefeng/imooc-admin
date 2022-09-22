<template>
  <!-- 主题图标  -->
  <el-dropdown v-bind="$attrs" @command="handleSelectTheme" trigger="click">
    <!-- 图标 -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <SvgIcon icon="change-theme" />
      </el-tooltip>
    </div>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{
          $t("msg.theme.themeColorChange")
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <SelectColor v-model="selectColorVisible" />
  </div>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon";
import SelectColor from "./components/selectColor.vue";
import { ref } from "vue";
const selectColorVisible = ref(false);

const handleSelectTheme = (command) => {
  selectColorVisible.value = true;
};
</script>

<style lang="scss" scoped></style>
