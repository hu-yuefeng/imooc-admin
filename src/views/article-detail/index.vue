<template>
  <div class="detail-container">
    <div class="detail-title">{{ articleData.title }}</div>
    <div class="detail-static">
      <div class="detail-static-left">
        <span class="author"
          >{{ $t("msg.article.author") }}: {{ articleData.author }}</span
        >
        <span class="time"
          >{{ $t("msg.article.publicDate") }}:
          {{ $filters.dateFilter(articleData.publicDate) }}</span
        >
      </div>
      <div class="detail-static-right">
        <el-button type="text" class="edit" @click="onEditClick">{{
          $t("msg.article.edit")
        }}</el-button>
      </div>
    </div>
    <div class="content" v-html="articleData.content"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { articleDetail } from "@/api/aiticle";
import { useRoute, useRouter } from "vue-router";
import { watchSwitchLang } from "@/utils/i18n";

const articleData = ref({});
const route = useRoute();
const router = useRouter();
const getArticleDetail = async () => {
  articleData.value = (await articleDetail(route.params.id)).data;
};
getArticleDetail();
watchSwitchLang(getArticleDetail);
const onEditClick = () => {
  const id = route.params.id;
  router.push(`/article/editor/${id}`);
};
</script>

<style lang="scss" scoped>
.detail-title {
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
.detail-static {
  display: flex;
  justify-content: space-between;
  padding: 26px 0px 5px 0px;
}
.detail-static-left {
  display: flex;
  align-items: center;
  font-size: 14px;
  .author {
    margin-right: 20px;
  }
}
.detail-static-right {
  vertical-align: middle;
  font-size: 14px;
}
.content {
  padding: 20px 0px;
  font-size: 14px;
  border-top: 1px solid #d4d4d4;
}
</style>
