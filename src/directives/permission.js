import store from "@/store";

function checkPermission(el, binding) {
  // 获取对应的权限
  const { value } = binding;
  // 获取当前用户的所有功能权限
  const points = store.getters.userInfo.permission.points;
  // value必须是一个数组
  if (value && value instanceof Array) {
    const hasPermission = points.some((point) => {
      return value.includes(point);
    });
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error("v-permission value is ['admin',...]");
  }
}

export default {
  // 在绑定元素的父组件被挂载之后调用
  mounted(el, binding) {
    checkPermission(el, binding);
  },
  // 在包含组件的VNode及其子组件的VNode更新后调用
  update(el, binding) {
    checkPermission(el, binding);
  },
};
