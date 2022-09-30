<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in chapterData"
      :key="index"
      :timestamp="activity.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ activity.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { ref } from "vue";
import { chapter } from "@/api/user";
import { watchSwitchLang } from "@/utils/i18n";
const chapterData = ref([]);
const getChapter = async () => {
  const res = await chapter();
  chapterData.value = res.data;
};
getChapter();
watchSwitchLang(getChapter);
</script>

<style lang="scss" scoped></style>
