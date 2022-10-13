// 指定初始列数据
import i18n from "@/i18n";

const t = i18n.global.t;
export default () => [
  {
    id: 1,
    label: t("msg.article.ranking"),
    prop: "ranking",
  },
  {
    id: 2,
    label: t("msg.article.title"),
    prop: "title",
  },
  {
    id: 3,
    label: t("msg.article.author"),
    prop: "author",
  },
  {
    id: 4,
    label: t("msg.article.publicDate"),
    prop: "publicDate",
  },
  {
    id: 5,
    label: t("msg.article.desc"),
    prop: "desc",
  },
  {
    id: 6,
    label: t("msg.article.action"),
    prop: "action",
  },
];
