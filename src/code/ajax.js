/**
 * Created by xiyuyizhi on 16-12-20.
 */

import contentType from './var/contentType'
import dataType from './var/dataType'
import xhr from './getXhr'

/**
 * xhr成功响应处理
 * @param {string} dataT 前端解析后台数据的格式
 * @param {string} theXhr xhr object
 * @param {function} successCallback 处理函数
 */
function successFn(dataT, theXhr, successCallback) {
  switch (dataT) {
    case 'text':
      successCallback(theXhr.responseText, theXhr.status, theXhr.statusText)
      break
    case 'json':
      successCallback(JSON.parse(theXhr.responseText), theXhr.status, theXhr.statusText)
      break
    case 'xml':
      successCallback(JSON.parse(theXhr.responseXML), theXhr.status, theXhr.statusText)
      break
    case 'jsonP':
      break
    default:
  }
}

/**
 * xhr失败响应处理
 * @param {object} theXhr xhr object
 * @param {function} errorCallback 处理函数
 */
function errorFn(theXhr, errorCallback) {
  errorCallback(theXhr.responseText, theXhr.status, theXhr.statusText)
}

/**
 * 请求 request header 设置
 * @param {string} type header类型
 * @param {string} value  header 值
 */
function headerSet(type, value) {
  xhr.setRequestHeader(type, value)
}

/**
 * 从响应头中提取属性值
 */
// function getHeader() {
//
// }

/**
 * @param {object} conf options
 */
export default function (conf) {
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        if (conf.success) {
          successFn(conf.dataType, xhr, conf.success)
        } else {
           // promise方式

        }
      } else if (conf.error) {
        errorFn(xhr)
      } else {
          // promise方式

      }
    }
  }
  xhr.open(conf.type, conf.url, true)
  /**
   * 设置后台接受的数据类型
   */
  headerSet('Content-Type', contentType[conf.contentType])
  headerSet('Accept', dataType[conf.dataType])
  xhr.send(conf.data || null)
}
