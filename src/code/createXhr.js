/**
 * Created by xiyuyizhi on 16-12-20.
 */

import headers from "./var/headers"


function headerSet(confHeaders,xhr) {

  const keys=Object.keys(confHeaders)

  for(let key of keys){
    if(headers[key]){
      const k=headers[key].name
      const v=headers[key][confHeaders[key]]
      xhr.setRequestHeader(k,v)
    }else{
      xhr.setRequestHeader(key,confHeaders[key])
    }
  }

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
  headerSet(conf.headers,xhr)
  xhr.send(JSON.stringify(conf.data) || null)
  return xhr;
}
