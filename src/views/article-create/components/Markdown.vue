<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div class="markdown-box"></div>
    <!-- 按钮 -->
    <div class="bottom">
      <el-button type="primary" @click="onSumbitClick">{{
        $t("msg.article.commit")
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, defineEmits, watch } from "vue";
import MKEditor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { useStore } from "vuex";
import { watchSwitchLang } from "@/utils/i18n";
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
let mkEditor;
let el;
onMounted(() => {
  el = document.querySelector(".markdown-box");
  initEditor();
});

const store = useStore();
const initEditor = () => {
  mkEditor = new MKEditor({
    // el
    el,
    height: "500px",
    previewStyle: "vertical",
    language: store.getters.language === "zh" ? "zh-CN" : "en",
  });
  mkEditor.getMarkdown();
};
watchSwitchLang(() => {
  if (!el) return;
  const htmlStr = mkEditor.getHTML();
  mkEditor.destroy();
  initEditor();
  mkEditor.setHTML(htmlStr);
});
const i18n = useI18n();
const onSumbitClick = async () => {
  if (props.detail && props.detail._id) {
    await articleEdit({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML(),
    });
    ElMessage.success(i18n.t("msg.article.editorSuccess"));
  } else {
    await articleCreate({
      title: props.title,
      content: mkEditor.getHTML(),
    });
    ElMessage.success(i18n.t("msg.article.createSuccess"));
    mkEditor.reset();
    emits("onSuccess");
  }
};
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content);
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
