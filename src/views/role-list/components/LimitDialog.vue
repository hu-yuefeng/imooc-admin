<template>
  <el-dialog
    width="40%"
    v-model="dialogValueVisible"
    :title="$t('msg.role.assignPermissions')"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allRolePermissionData"
      show-checkbox
      node-key="id"
      default-expand-all
      check-strictly
      :props="defaultProps"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t("msg.universal.cancel") }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t("msg.universal.confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref, watch } from "vue";
import {
  rolePermission,
  permissionList,
  distributePermission,
} from "@/api/role";
import { watchSwitchLang } from "@/utils/i18n";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
const allRolePermissionData = ref([]);
const defaultProps = {
  children: "children",
  label: "permissionName",
};
const getAllRolePermission = async () => {
  allRolePermissionData.value = (await permissionList()).data;
};
getAllRolePermission();
watchSwitchLang(getAllRolePermission);
const prop = defineProps({
  dialogValue: {
    type: Boolean,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});

const dialogValueVisible = computed(() => {
  return prop.dialogValue;
});
const emits = defineEmits(["update:dialogValue"]);
const i18n = useI18n();

const confirm = async () => {
  await distributePermission({
    roleId: prop.roleId,
    permissions: treeRef.value.getCheckedKeys(),
  });
  ElMessage.success(i18n.t("msg.role.updateRoleSuccess"));

  closed();
};
const closed = () => {
  emits("update:dialogValue", false);
};
// ref
const treeRef = ref(null);
const getRoleList = async () => {
  const treeRes = (await rolePermission(prop.roleId)).data;
  treeRef.value.setCheckedKeys(treeRes);
  // console.log(treeRes);
};
watch(
  () => prop.roleId,
  (val) => {
    if (val) getRoleList();
  }
);
</script>

<style lang="scss" scoped></style>
