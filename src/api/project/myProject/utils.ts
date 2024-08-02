import Vue from 'vue';

/**
 * 在金额相加时处理undefined的情况
 * @param args
 * @returns {*}
 */
export function addFunds(...args) {
  return args.reduce((previousValue, currentValue, currentIndex, array) => {
    return currentValue ? previousValue + currentValue : previousValue;
  }, 0);
}

/**
 * 过滤掉list中firstKey属性为undefined的对象，firstKey默认为id
 * @param list
 * @param firstKey
 * @returns {*[]}
 */
// export function filterList(list, firstKey = 'id') {
//   const newList = [];
//   if (list.length > 0) {
//     list.forEach((item) => {
//       item[firstKey] ? newList.push(item) : 'continue';
//     });
//   }
//   return newList;
// }
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

/**
 * 重置对象中的属性值
 * @param obj
 * @param value
 */
export function resetObject(obj, value = null) {
  for (const key in obj) {
    // Vue3中.set方法已经被弃用了，Vue3可以直接赋值
    // Vue.set(obj, key, value);
    obj[key] = value;
  }
  console.log('已经重置完成');
}
