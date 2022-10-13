<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    width="40%"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="(item, index) in allRoleList"
        :label="item.title"
        :key="index"
      />
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t("msg.universal.cancel") }}</el-button>
        <el-button type="primary" @click="handleRole">{{
          $t("msg.universal.confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, ref, defineEmits, watch, computed } from "vue";
import { useStore } from "vuex";
import { roleList, roleChange } from "@/api/role";
import { watchSwitchLang } from "@/utils/i18n";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const propData = defineProps({
  rowsList: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const checkList = ref([]);
watch(
  () => propData.modelValue,
  (val) => {
    if (val) {
      checkList.value = propData.rowsList.role.map((item) => item.title);
    }
  }
);
// 所有角色
const allRoleList = ref([]);
const getListData = async () => {
  allRoleList.value = (await roleList()).data;
};
getListData();
watchSwitchLang(getListData);
const store = useStore();
const language = computed(() => {
  return store.getters.language;
});
const i18n = useI18n();

const emits = defineEmits(["update:modelValue", "updateRole"]);
const closed = () => {
  emits("update:modelValue", false);
};
const handleRole = () => {
  const params = checkList.value.map((title) => {
    return allRoleList.value.find((v) => v.title === title);
  });
  const res = roleChange(propData.rowsList._id, params);

  ElMessage.success(i18n.t("msg.role.updateRoleSuccess"));
  // console.log(checkList.value);
  emits("updateRole");
  closed();
};
</script>

<style lang="scss" scoped></style>
