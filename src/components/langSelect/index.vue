<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSelectLanguage"
  >
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <SvgIcon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { computed, ref, defineProps } from "vue";
import { useStore } from "vuex";
import SvgIcon from "@/components/SvgIcon";

defineProps({
  effect: {
    type: String,
    default: "dark",
    validate: function (value) {
      return ["dark", "light"].indexOf(value) !== -1;
    },
  },
});
const store = useStore();
const language = computed(() => {
  return store.getters.language;
});
const i18n = useI18n();
const handleSelectLanguage = (lang) => {
  // 切换语言方法
  i18n.locale.value = lang;
  store.commit("app/setLanguage", lang);
  //提示
  ElMessage.success(i18n.t("msg.toast.switchLangSuccess"));
};
</script>

<style lang="scss" scoped></style>
