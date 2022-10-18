<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onExcelImport"
          v-permission="['importUser']"
          >{{ $t("msg.excel.importExcel") }}</el-button
        >
        <el-button type="success" @click="onExcelOutport" :loading="loading">{{
          $t("msg.excel.exportExcel")
        }}</el-button>
      </div>
    </el-card>
    <!-- table -->
    <el-card class="">
      <el-table :data="roleListData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
        ></el-table-column>
        <!-- 手机号 -->
        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image> </template
        ></el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="(item, index) in row.role" :key="index">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t("msg.excel.defaultRole") }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
        >
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t("msg.excel.show")
            }}</el-button>
            <el-button
              type="info"
              size="small"
              @click="onRoleClick(row)"
              v-permission="['distributeRole']"
              >{{ $t("msg.excel.showRole") }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t("msg.excel.remove") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="size"
        :current-page="page"
        :page-sizes="[10, 20, 50]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <RoleDialog
      :rowsList="selectRole"
      v-model="modelValue"
      @updateRole="getList"
    />
  </div>
</template>

<script setup>
import { nextTick, onActivated, ref } from "vue";
import { list, deleteUser, getAllUser } from "@/api/user-manage";
import { watchSwitchLang } from "@/utils/i18n";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import { USER_RELATIONS } from "./Export2ExcelConstant";
import { dateFilter } from "@/filters/index";
import RoleDialog from "./components/role.vue";
const router = useRouter();
const i18n = useI18n();

// 数据相关
const roleListData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(10);
const loading = ref(false);
const getList = async () => {
  const result = await list({
    page: page.value,
    size: size.value,
  });
  const { data } = result;
  total.value = data.total;
  roleListData.value = data.list;
};
getList();
watchSwitchLang(getList);
onActivated(getList);
const handleSizeChange = (val) => {
  size.value = val;
  getList();
};
const handleCurrentChange = (val) => {
  page.value = val;
  getList();
};
// excel导入事件
const onExcelImport = () => {
  router.push("/user/import");
};
// 查看用户详情
const onShowClick = (row) => {
  router.push(`/user/info/${row._id}`);
};
// 用户删除事件
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t("msg.excel.dialogTitle1") +
      row.username +
      i18n.t("msg.excel.dialogTitle2"),
    {
      type: "warning",
    }
  ).then(async () => {
    const { code } = await deleteUser(row._id);
    if (code === 200) {
      ElMessage.success(i18n.t("msg.excel.removeSuccess"));
      // getList();
      roleListData.value = roleListData.value.filter((item) => {
        return item._id !== row._id;
      });
      total.value--;
    }
  });
};
// excel导出

const onExcelOutport = () => {
  ElMessageBox.prompt("", i18n.t("msg.excel.title"), {
    distinguishCancelAndClose: true,
    confirmButtonText: i18n.t("msg.excel.confirm"),
    cancelButtonText: i18n.t("msg.excel.close"),
    inputValue: i18n.t("msg.excel.defaultName"),
  }).then(async ({ value }) => {
    loading.value = true;
    const data = await getAllUser();
    const allUser = data.data.list;
    console.log(allUser);
    // 导出工具包
    const excel = await import("@/utils/Export2Excel");
    const excelData = formatJson(USER_RELATIONS, allUser);
    excel.export_json_to_excel({
      // 表头
      header: Object.keys(USER_RELATIONS),
      // 数据
      data: excelData,
      // 文件名称
      filename: value,
    });
    console.log(excelData);
    loading.value = false;
    ElMessage({
      type: "success",
      message: value,
    });
  });
};
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      if (headers[key] === "role") {
        const roles = item[headers[key]];
        return JSON.stringify(roles.map((item) => item.title));
      }
      if (headers[key] === "openTime") {
        return dateFilter(item[headers[key]], "YYYY/MM/DD");
      }
      return item[headers[key]];
    });
  });
};
const selectRole = ref([]);
const modelValue = ref(false);
const onRoleClick = (row) => {
  // console.log(row.role);
  // const data = row.role.map((item) => {
  //   let { id, ...params } = item;
  //   return params;
  // });
  // const result = data.map((item) => {
  //   return Object.keys(item).map((key) => {
  //     return item[key];
  //   });
  // });
  // selectRole.value = result.flat();
  selectRole.value = row;
  modelValue.value = true;
};
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
