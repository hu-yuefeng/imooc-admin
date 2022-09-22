import formula from "@/constant/formula.json";
import axios from "axios";
import rgbHex from "rgb-hex";
import color from "css-color-function";

// 把生成的样式表写入style中
export const writeNewStyle = (newStyle) => {
  const style = document.createElement("style");
  style.innerText = newStyle;
  document.head.appendChild(style);
};
// 根据主题色生成样式表
export const generateNewStyle = async (parimaryColor) => {
  // 1、根据主色生成色值表
  const colors = generateColors(parimaryColor);
  // 2、获取当前的element-plus的默认样式表，并且需要进行替换的色值打上标记
  let cssText = await getOriginalStyle();
  // 3、比那里生成的色值表，在默认样式表进行全局替换
  Object.keys(colors).map((key) => {
    cssText = cssText.replace(
      new RegExp("(:|\\s+)" + key, "g"),
      "$1" + colors[key]
    );
  });
  return cssText;
};
export const generateColors = (primary) => {
  if (!primary) return;
  const colors = {
    primary,
  };
  Object.keys(formula).map((k) => {
    const value = formula[k].replace(/primary/g, primary);
    colors[k] = "#" + rgbHex(color.convert(value));
  });
  return colors;
};

export const getOriginalStyle = async () => {
  const version = require("element-plus/package.json").version;
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`;
  const { data } = await axios(url);
  return getStyleTemplate(data);
};
const getStyleTemplate = (data) => {
  // element-plus 默认色值
  const colorMap = {
    "#3a8ee6": "shade-1",
    "#409eff": "primary",
    "#337ecc": "primary",
    "#53a8ff": "light-1",
    "#66b1ff": "light-2",
    "#79bbff": "light-3",
    "#8cc5ff": "light-4",
    "#a0cfff": "light-5",
    "#b3d8ff": "light-6",
    "#c6e2ff": "light-7",
    "#d9ecff": "light-8",
    "#ecf5ff": "light-9",
  };
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).map((key) => {
    const value = colorMap[key];
    data = data.replace(new RegExp(key, "ig"), value);
  });
  return data;
};
