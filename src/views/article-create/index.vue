<template>
  <el-card
    ><el-input
      class="title-input"
      width="100%"
      :placeholder="$t('msg.article.titlePlaceholder')"
      v-model="title"
      maxlength="20"
      clearable />
    <el-tabs v-model="activeName">
      <el-tab-pane label="markdown" name="markdown"
        ><Markdown :title="title" @onSuccess="onSuccess" :detail="detail"
      /></el-tab-pane>
      <el-tab-pane :label="$t('msg.article.richText')" name="editor"
        ><Editor :title="title" @onSuccess="onSuccess" :detail="detail"
      /></el-tab-pane> </el-tabs
  ></el-card>
</template>

<script setup>
import { ref } from "vue";
import Editor from "./components/Editor.vue";
import Markdown from "./components/Markdown.vue";
import { articleDetail } from "@/api/aiticle";
import { watchSwitchLang } from "@/utils/i18n";
import { useRoute } from "vue-router";

const activeName = ref("markdown");
const title = ref("");
const onSuccess = () => {
  title.value = "";
};
// 处理编辑
const route = useRoute();
const articleId = route.params.id;
const detail = ref({});
const getarticleDetail = async () => {
  detail.value = (await articleDetail(articleId)).data;
  title.value = detail.value.title;
};
if (articleId) {
  getarticleDetail();
  watchSwitchLang(getarticleDetail);
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
