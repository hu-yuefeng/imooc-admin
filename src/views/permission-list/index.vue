<template>
  <div class="">
    <el-card>
      <el-table
        :data="permissionListData"
        style="width: 100%"
        border
        lazy
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="180"
        />
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="180"
        />
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { permissionList } from "@/api/role";
import { watchSwitchLang } from "@/utils/i18n";
const permissionListData = ref([]);
const getPermissionList = async () => {
  permissionListData.value = (await permissionList()).data;
};
getPermissionList();
watchSwitchLang(getPermissionList);
</script>

<style lang="scss" scoped></style>
