

/**
 * Created by xiyuyizhi on 16-12-20.
 */

import WW from './code/code'

console.log(WW.$http({
  url: 'api/users/',
  success(data) {
    console.log(data)
  },
  error(data, status, statusText) {
    console.log(data)
    console.log(status)
    console.log(statusText)
  },
}))


window.WW = WW
