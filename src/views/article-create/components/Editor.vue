<template>
  <div class="edit-container">
    <!-- 渲染区 -->
    <div class="edit-box"></div>
    <!-- 按钮 -->
    <div class="bottom">
      <el-button type="primary" @click="onSumbitClick">{{
        $t("msg.article.commit")
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, defineProps, defineEmits } from "vue";
import E from "wangeditor";
import i18next from "i18next";
import { useStore } from "vuex";
import { articleCreate, articleEdit } from "@/api/aiticle";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: Object,
  },
});
const emits = defineEmits(["onSuccess"]);
const store = useStore();
// 初始化实例
let editor;
// 获取dom
let el;
const initTxtEditor = () => {
  editor = new E(el);
  editor.config.zIndex = 1;
  // 菜单栏提示
  editor.config.showMenuTooltips = true;
  editor.config.menuTooltipPosition = "down";
  // 国际化相关处理
  editor.config.lang = store.getters.language === "zh" ? "zh-CN" : "en";
  editor.i18next = i18next;
  editor.create();
};
onMounted(() => {
  el = document.querySelector(".edit-box");
  initTxtEditor();
});
watch(
  () => store.getters.language,
  (val) => {
    if (val) {
      const htmlStr = editor.txt.html();
      editor.destroy();
      initTxtEditor();
      editor.txt.html(htmlStr);
    }
  }
);
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content);
    }
  },
  {
    immediate: true,
  }
);
const i18n = useI18n();
const onSumbitClick = async () => {
  if (props.detail && props.detail._id) {
    await articleEdit({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html(),
    });
    ElMessage.success(i18n.t("msg.article.editorSuccess"));
  } else {
    await articleCreate({
      title: props.title,
      content: editor.txt.html(),
    });
    ElMessage.success(i18n.t("msg.article.createSuccess"));
    editor.txt.html("");
    emits("onSuccess");
  }
};
</script>

<style lang="scss" scoped>
.edit-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
