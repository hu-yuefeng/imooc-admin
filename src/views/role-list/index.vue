<template>
  <div class="">
    <el-card>
      <el-table :data="roleListData" border style="width: 100%">
        <el-table-column prop="id" :label="$t('msg.role.index')" width="120" />
        <el-table-column prop="title" :label="$t('msg.role.name')" />
        <el-table-column prop="describe" :label="$t('msg.role.desc')" />
        <el-table-column :label="$t('msg.role.action')" width="200">
          <template #default="{ row }">
            <el-button
              size="mini"
              type="primary"
              @click="handleClick(row)"
              v-permission="['distributePermission']"
              >{{ $t("msg.role.assignPermissions") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <LimitDialog v-model:dialogValue="dialogValue" :roleId="roleId" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { roleList } from "@/api/role";
import { watchSwitchLang } from "@/utils/i18n";
import LimitDialog from "./components/LimitDialog.vue";
const roleListData = ref([]);
const getRoleList = async () => {
  roleListData.value = (await roleList()).data;
};
getRoleList();
watchSwitchLang(getRoleList);
const dialogValue = ref(false);
const roleId = ref("");
const handleClick = (row) => {
  roleId.value = row.id;
  dialogValue.value = true;
  // console.log(11, row);
};
</script>

<style lang="scss" scoped></style>
