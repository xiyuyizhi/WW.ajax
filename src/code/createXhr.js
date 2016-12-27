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
      if(confHeaders[key]!=='multipart'){ //附件上传不需要指定content-type:multipart/form-data
        const k = headers[key].name
        const v = headers[key][confHeaders[key]]
        xhr.setRequestHeader(k, v)
      }
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

  /**
   * 绑定upload事件
   */
  if (conf.uploadProcess) {
    const up = xhr.upload
    if (up) {
      if (up.addEventListener) {
        up.addEventListener('progress', (e) => {
          conf.uploadProcess(e)
        })
      } else if (up.attachEvent) {
        up.attachEvent('progress', (e) => {
          conf.uploadProcess(e)
        })
      } else {
        up.onprogress = function (e) {
          conf.uploadProcess(e)
        }
      }
    }
  }

  xhr.open(conf.type, conf.url, conf.async)
  /**
   * 设置后台接受的数据类型
   */
  headerSet(conf.headers, xhr)
  if(conf.headers.contentType=='multipart'){
    //上传文件类型
    const formData = new FormData();
    formData.append('file', conf.data);//multipart/form-data
    xhr.send(formData);
  }else{
    xhr.send(JSON.stringify(conf.data) || null)
  }

  return xhr
}
