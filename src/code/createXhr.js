/**
 * Created by xiyuyizhi on 16-12-20.
 */
import contentType from './var/contentType'
import dataType from './var/dataType'

/**
 * 请求 request header 设置
 * @param {string} type header类型
 * @param {string} value  header 值
 */
function headerSet(type, value,xhr) {
  xhr.setRequestHeader(type, value)
}

export default function(conf){
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
  headerSet('Content-Type', contentType[conf.headers.contentType],xhr)
  headerSet('Accept', dataType[conf.headers.dataType],xhr)
  xhr.send(JSON.stringify(conf.data) || null)
  return xhr;
}
