import Sortable from "sortablejs";
import { ref } from "vue";
import { articleSort } from "@/api/aiticle";
import { ElMessage } from "element-plus";
import i18n from "@/i18n";

export const tableRef = ref(null);
export const initSortable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelector(
    ".el-table__body-wrapper > table > tbody"
  );
  // 1.要拖拽的元素
  // 2.配置对象
  Sortable.create(el, {
    // 拖拽时的类名
    ghostClass: "sortable-ghost",
    // 拖拽结束的回调
    async onEnd(event) {
      const { newIndex, oldIndex } = event;
      if (newIndex === oldIndex) {
        return;
      }
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking,
      });
      console.log(tableData.value);
      // 直接获取数据，table无法直接刷新
      tableData.value = [];
      cb && (await cb());
      console.log("222", tableData.value);
      ElMessage.success(i18n.global.t("msg.article.sortSuccess"));
    },
  });
};
