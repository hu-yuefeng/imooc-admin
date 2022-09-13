// 是否为外部资源
export function isExternal(path) {
  return /^(https:|http:|mailto:|tel:)/.test(path);
}
