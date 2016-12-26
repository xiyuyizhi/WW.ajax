/**
 * Created by xiyuyizhi on 16-12-20.
 */

import headers from './var/headers'

/**
 * set request header
 * @param {object} confHeaders 要设置的响应头对象
 * @param {object} xhr xhrhttprequest
 */
function headerSet(confHeaders, xhr) {
  const keys = Object.keys(confHeaders)

  for (const key of keys) {
    if (headers[key]) {
      const k = headers[key].name
      const v = headers[key][confHeaders[key]]
      xhr.setRequestHeader(k, v)
    } else {
      xhr.setRequestHeader(key, confHeaders[key])
    }
  }
}

/**
 * 发送请求操作
 * @param {object} conf config
 * @return {*} 处理ajax操作后的xhr实例
 */
export default function (conf) {
  let xhr

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  xhr.open(conf.type, conf.url, conf.async)
  /**
   * 设置后台接受的数据类型
   */
  headerSet(conf.headers, xhr)
  xhr.send(JSON.stringify(conf.data) || null)
  return xhr
}
