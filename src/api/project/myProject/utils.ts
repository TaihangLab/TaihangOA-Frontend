import Vue from 'vue';

export function filterList(list = [], firstKey = 'id') {
  // 确保 list 是一个数组
  if (!Array.isArray(list)) {
    throw new TypeError('The first argument must be an array');
  }
  const newList = [];
  list.forEach((item) => {
    // 只将具有 firstKey 属性的项添加到 newList 中
    if (item[firstKey]) {
      newList.push(item);
    }
  });
  return newList;
}
