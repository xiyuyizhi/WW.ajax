/**
 * Created by xiyuyizhi on 16-12-20.
 */

/**
 * 合并两个对象
 * @param {object} toMerge 原始对象
 * @param {object} obj 要合并的对象
 * @return {object} 合并后的对象
 */

const toString={}.toString
const hasOwnProp={}.hasOwnProperty

function merge(toMerge, obj) {
  for (const key in obj) {
    if (hasOwnProp.call(obj, key)) {
      if(toString.call(obj[key])=='[object Object]'){
        merge(toMerge[key],obj[key])
      }else{
        toMerge[key] = obj[key]
      }

    }
  }
  return toMerge
}

export default merge
