<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">{{ $t("msg.tagsView.refresh") }}</li>
    <li @click="onCloseRightClick">{{ $t("msg.tagsView.closeRight") }}</li>
    <li @click="onCloseOtherClick">{{ $t("msg.tagsView.closeOther") }}</li>
  </ul>
</template>

<script setup>
import store from "@/store";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});
// 刷新事件
const router = useRouter();
const onRefreshClick = () => {
  router.go(0);
};

const onCloseRightClick = () => {
  const payload = {
    type: "right",
    index: props.index,
  };
  store.commit("app/removeTagsView", payload);
};
const onCloseOtherClick = () => {
  const payload = {
    type: "other",
    index: props.index,
  };
  store.commit("app/removeTagsView", payload);
};
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
