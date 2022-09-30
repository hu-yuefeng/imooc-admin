<template>
  <el-collapse v-model="activeNames" accordion>
    <el-collapse-item
      :title="item.title"
      :name="index"
      v-for="(item, index) in featureData"
      :key="index"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { defineProps, ref } from "vue";
defineProps({
  featureData: {
    type: Array,
    required: true,
  },
});
const activeNames = ref(0);
</script>

<style lang="scss" scoped>
::v-deep .el-collapse-item__header {
  font-weight: bold;
}

.el-collapse-item {
  ::v-deep a {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
