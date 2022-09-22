<template>
  <div class="" @click="onToggle">
    <SvgIcon :icon="isFull ? 'exit-fullscreen' : 'fullscreen'" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import screenfull from "screenfull";
import SvgIcon from "@/components/SvgIcon";
const isFull = ref(false);
const onToggle = () => {
  screenfull.toggle();
  // console.log(screenfull.isFullscreen);
};
// 监听screenfull的变化
const change = () => {
  isFull.value = screenfull.isFullscreen;
};
// on事件绑定监听
onMounted(() => {
  screenfull.on("change", change);
});
// off事件取消绑定
onUnmounted(() => {
  screenfull.off("change", change);
});
</script>

<style lang="scss" scoped></style>
