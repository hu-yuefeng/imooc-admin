<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard class="project-card" :featureData="featureData" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <Feature :featureData="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <Chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <Auther />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Auther from "./components/Auther.vue";
import Chapter from "./components/chapter.vue";
import Feature from "./components/Feature.vue";
import ProjectCard from "./components/projectCard.vue";
import { feature } from "@/api/user";
import { watchSwitchLang } from "@/utils/i18n";
const activeName = ref("feature");
const featureData = ref([]);
const getFeatureData = async () => {
  const res = await feature();
  featureData.value = res.data;
};
getFeatureData();
watchSwitchLang(getFeatureData);
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
