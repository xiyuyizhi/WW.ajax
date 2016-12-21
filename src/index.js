

/**
 * Created by xiyuyizhi on 16-12-20.
 */

import http from './code/transport'

http({
  url: 'api/users/',
  success(data) {
    console.log(data)
  },
  error(status, statusText) {
    console.log(status)
    console.log(statusText)
  },
}).then(function(data){
  console.log('success')
  console.log(data)
},function(status){
  console.log('error')
  console.log(status)
})

