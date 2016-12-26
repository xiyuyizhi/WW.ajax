/**
 * Created by xiyuyizhi on 16-12-23.
 */

/**
 *
 * @param {object} obj 原始对象
 * @return {object} clone的新对象
 */
export default function (obj) {
  const newObj = {}

  /**
   *
   * @param {object} old 原始对象
   * @param {object} newV 新对象
   */
  function clone(old, newV) {
    const keys = Object.keys(old)
    for (const key of keys) {
      if ({}.toString.call(old[key]) !== '[object Object]') {
        newV[key] = old[key]
      } else {
        newV[key] = {}
        clone(old[key], newV[key])
      }
    }
  }
  clone(obj, newObj)
  return newObj
}
