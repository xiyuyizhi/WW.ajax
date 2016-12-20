/**
 * Created by xiyuyizhi on 16-12-20.
 */

import Http from './http'

/**
 *
 * @param {object} config 需要传入的参数对象
 * @returns {Http} ret
 */
function $http(config) {
  return new Http(config)
}

['get', 'post', 'put', 'delete', 'header'].forEach((item) => {
  $http[item] = function () {

  }
})


const WW = {
  $http,
}


export default WW
