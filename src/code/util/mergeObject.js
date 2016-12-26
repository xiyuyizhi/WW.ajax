/**
 * Created by xiyuyizhi on 16-12-20.
 */

const hasOwnProp = {}.hasOwnProperty

/**
 * 合并两个对象
 * @param {object} option 原始对象
 * @param {object} toMerge 要合并的对象
 * @return {*} 合并后的对象
 */
function merge(option, toMerge) {
  for (const key in toMerge) {
    if (hasOwnProp.call(toMerge, key)) {
      if (key === 'headers') {
        option[key] = merge(option[key], toMerge[key])
      } else {
        option[key] = toMerge[key]
      }
    }
  }
  return option
}

export default merge
