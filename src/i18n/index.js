import { createI18n } from "vue-i18n";
import enLocale from "@/i18n/lang/en";
import zhLocale from "@/i18n/lang/zh";
import store from "@/store";
const messages = {
  en: {
    msg: {
      ...enLocale,
    },
  },
  zh: {
    msg: {
      ...zhLocale,
    },
  },
};
function getLanguage() {
  return store && store.getters && store.getters.language;
}

// const locale = "zh";
const i18n = createI18n({
  // 使用compositionAPI
  legacy: false,
  // 全局使用t函数
  globalInjection: true,
  locale: getLanguage(),
  messages,
});
export default i18n;
