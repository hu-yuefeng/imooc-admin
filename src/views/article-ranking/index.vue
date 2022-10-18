<template>
  <div class="">
    <el-card>
      <span class="dynamicTitle">{{
        $t("msg.article.dynamicTitle") + ":"
      }}</span>
      <span class="check-box"
        ><el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
          /> </el-checkbox-group
      ></span>
    </el-card>
    <el-card class="card-main">
      <el-table ref="tableRef" :data="articleList" border style="width: 100%">
        <template v-for="(item, index) in tableColumns" :key="index">
          <el-table-column
            v-if="item.prop === 'publicDate'"
            :prop="item.prop"
            :label="item.label"
          >
            <template #default="{ row }">
              {{ $filters.relativeTime(row.publicDate) }}
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.prop === 'action'"
            :prop="item.prop"
            :label="item.label"
          >
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                @click="onShowClick(row)"
                >{{ $t("msg.excel.show") }}</el-button
              >
              <el-button type="danger" size="small" @click="onDelClick(row)">{{
                $t("msg.excel.remove")
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column v-else :prop="item.prop" :label="item.label" />
        </template>

        <!-- <el-table-column prop="title" :label="$t('msg.article.title')" />
        <el-table-column prop="author" :label="$t('msg.article.author')" />
        <el-table-column :label="$t('msg.article.publicDate')">
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="$t('msg.article.desc')" />
        <el-table-column :label="$t('msg.article.action')" width="180">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t("msg.excel.show")
            }}</el-button>
            <el-button type="danger" size="small" @click="onDelClick(row)">{{
              $t("msg.excel.remove")
            }}</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        class="pagination-container"
        :page-size="size"
        :current-page="page"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted, nextTick } from "vue";
import { getArticleList, delArticle } from "@/api/aiticle";
import { watchSwitchLang } from "@/utils/i18n";
import { dateFilter } from "@/filters/index";
import { tableColumns, selectDynamicLabel, dynamicData } from "./dynamic/index";
import { tableRef, initSortable } from "./sortable";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const page = ref(1);
const size = ref(10);
const total = ref(null);
const articleList = ref([]);
const getAllArticleList = async () => {
  const res = (await getArticleList({ page: page.value, size: size.value }))
    .data;
  articleList.value = res.list;
  total.value = res.total;
  // console.log(articleList.value);
};
// getAllArticleList();
watchSwitchLang(getAllArticleList);
onActivated(getAllArticleList);

// 初始化sortable
onMounted(() => {
  initSortable(articleList, getAllArticleList);
  // getAllArticleList();
});

const handleSizeChange = (val) => {
  size.value = val;
  getAllArticleList();
};
const handleCurrentChange = (val) => {
  page.value = val;
  getAllArticleList();
};
// 查看事件
const router = useRouter();
const onShowClick = (row) => {
  router.push(`/article/${row._id}`);
  console.log(row);
};
// 删除事件
const i18n = useI18n();
const onDelClick = (row) => {
  ElMessageBox.confirm(
    i18n.t("msg.article.dialogTitle1") +
      row.title +
      i18n.t("msg.article.dialogTitle2"),
    {
      type: "warning",
    }
  ).then(async () => {
    await delArticle(row._id);
    ElMessage({
      type: "success",
      message: i18n.t("msg.article.removeSuccess"),
    });
    getAllArticleList();
  });
  // console.log(row);
};
</script>

<style lang="scss" scoped>
.card-main {
  margin-top: 20px;
}
.pagination-container {
  text-align: center;
  margin-top: 10px;
}
.dynamicTitle {
  font-weight: 600;
  display: inline-block;
}
.check-box {
  display: inline-block;
  margin-left: 20px;
  vertical-align: middle;
}
::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
