<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onExcelImport">{{
          $t("msg.excel.importExcel")
        }}</el-button>
        <el-button type="success">{{ $t("msg.excel.exportExcel") }}</el-button>
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
              <el-tag size="mini">{{ $t("msg.excel.defaultRole") }}</el-tag>
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
          <template #default>
            <el-button type="primary" size="mini">{{
              $t("msg.excel.show")
            }}</el-button>
            <el-button type="info" size="mini">{{
              $t("msg.excel.showRole")
            }}</el-button>
            <el-button type="danger" size="mini">{{
              $t("msg.excel.remove")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="size"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { onActivated, ref } from "vue";
import { list } from "@/api/user-manage";
import { watchSwitchLang } from "@/utils/i18n";
import { useRouter } from "vue-router";
const router = useRouter();
// 数据相关
const roleListData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(2);
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
