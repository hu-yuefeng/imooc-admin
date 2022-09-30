<template>
  <UploadExcel :onSuccess="onSuccess" />
</template>

<script setup>
import {} from "vue";
import UploadExcel from "@/components/upload-excel";
import { USER_RELATIONS, formatDate } from "./utils";
import { userBatchImport } from "@/api/user-manage";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const i18n = useI18n();
const router = useRouter();
const onSuccess = async ({ header, result }) => {
  const updateData = generateData(result);
  await userBatchImport(updateData);
  ElMessage.success({
    type: "success",
    message: result.length + i18n.t("msg.excel.importSuccess"),
  });
  router.push("/user/manage");
};

// 筛选数据
const generateData = (res) => {
  let arr = [];
  res.forEach((item) => {
    let userInfo = {};
    Object.keys(item).forEach((v) => {
      if (userInfo[USER_RELATIONS[v]] === "openTime") {
        userInfo[USER_RELATIONS[v]] = formatDate(item[v]);
        return;
      }
      userInfo[USER_RELATIONS[v]] = item[v];
    });
    arr.push(userInfo);
  });
  return arr;
};
</script>

<style lang="scss" scoped></style>
