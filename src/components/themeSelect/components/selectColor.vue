<template>
  <el-dialog
    :title="$t('msg.universal.title')"
    :model-value="modelValue"
    @close="closed"
    width="22%"
  >
    <div class="content">
      <p class="title">{{ $t("msg.theme.themeColorChange") }}</p>
      <el-color-picker
        v-model="myColor"
        :predefine="predefineColors"
        @change="activeColorChange"
      ></el-color-picker>
    </div>
    <template #footer>
      <span>
        <el-button @click="closed">{{ $t("msg.universal.cancel") }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t("msg.universal.confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useStore } from "vuex";
import { generateNewStyle, writeNewStyle } from "@/utils/theme";
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
// 预定义色值
const predefineColors = [
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
];

const emits = defineEmits(["update:modelValue"]);

const closed = () => {
  emits("update:modelValue", false);
};

const store = useStore();
// 默认色值
const myColor = ref(store.getters.mainColor);
// 色值确定事件
const activeColorChange = () => {};
const confirm = async () => {
  store.commit("theme/setMainColor", myColor.value);
  const newStyle = await generateNewStyle(myColor.value);
  console.log(newStyle);
  writeNewStyle(newStyle);
  closed();
};
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 10px;
  }
}
</style>
