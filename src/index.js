/**
 * Created by xiyuyizhi on 16-12-20.
 */

import Http from './code/code'
import upload from './code/upload'

const WW = {
  http: Http,
}

const loading = document.querySelector('.loading')

WW.http.Interceptor({
  request(config) {
    config.headers.token = 'tokennnn'
    loading.className += ' show'
    return config
  },
  response(data) {
    if (!WW.http.pendingRequests.length) {
      loading.className = 'loading'
    }
    console.log(data)
    return data
  },
  responseError(err) {
    console.log(err)
    loading.className = 'loading'
  }
})

// WW.http({
//   url: 'api/users/:userId',
//   params:{
//     userId:1
//   }
// }).then(function(data){
//   console.log('success')
//   console.log(data)
// },function(status){
//   console.log('error')
//   console.log(status)
// })
//
// WW.http({
//   url: 'api/users',
//   type: 'post',
//   params: {
//     condition: 'haha',
//   },
//   data: {
//     username: 'ww',
//     age: 22,
//   },
// }).then((data) => {
//   console.log('post success')
//   console.log(data)
// })


WW.http.get('api/users/:userId', {
  userId: 1,
}).then((data) => {
  console.log('get success')
  console.log(data)
})


WW.http.post('api/users',
  {
    username: 'ww',
    age: 22,
  }
).then((data) => {
  console.log('post success')
  console.log(data)
  console.log('get header: '+data.headers('content-type'))
})


upload('.btn', {
  url:'/api/upload'
})

upload('.btn1',{
  url:'/api/upload'
})