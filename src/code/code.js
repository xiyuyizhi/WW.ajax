/**
 * Created by xiyuyizhi on 16-12-20.
 */

import Http from './transport'
import merge from './util/mergeObject'
import options from './var/option'

/**
 *
 * @param {object} config 需要传入的参数对象
 * @returns {Http} ret
 */
function $http(config) {
  return new Http(config)
}


['get', 'delete', 'header'].forEach((item) => {
  $http[item] = function (...args) {
    let opt = {
      type: item,
      url: args[0],
      data: args[1],
    }
    opt = merge(options, opt)
    if (args[2] && {}.prototype.toString.call(args[2]) == '[object Object]') {
      opt = merge(opt, args[2])
    }
    Http[item](opt)
  }
})


const WW = {
  $http,
}


export default WW
