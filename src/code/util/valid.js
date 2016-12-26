/**
 * Created by xiyuyizhi on 16-12-26.
 */

import option from '../var/option'

/**
 *
 * @param {object} conf http()传入的配置参数
 * @return {*} 是否有不合法的property
 */
export default function (conf) {
  const keys = Object.keys(conf)
  const allowKeys = Object.keys(option)

  for (const key of keys) {
    if (allowKeys.indexOf(key) === -1) {
      return key
    }
  }
  return false
}
