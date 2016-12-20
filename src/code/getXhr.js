/**
 * Created by xiyuyizhi on 16-12-20.
 */

let xhr

if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest()
} else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP')
}

export default xhr
