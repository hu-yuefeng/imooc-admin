import { TIME_STAMP, TOKN_TIMEOUT_VALUE } from "@/constant/index";
import { getItem, setItem } from "@/utils/storage";

// 获取时间戳
export function getTimeStamp() {
  return getItem(TIME_STAMP);
}
// 设置时间戳
export function setTimeStamp() {
  return setItem(TIME_STAMP, Date.now());
}
// 对比时间戳，判断是否超时
export function isCheckTimeout() {
  // 当前时间
  const currentTime = Date.now();
  // 缓存时间
  const timeStamp = getTimeStamp();
  // console.log(currentTime);
  // console.log(timeStamp);
  return currentTime - timeStamp > TOKN_TIMEOUT_VALUE;
}
