/**
 * Created by xiyuyizhi on 16-12-20.
 */

import HttpFn from './code/WW'
import upload from './code/upload'

const WW = {
  http: HttpFn,
}

const loading = document.querySelector('.loading')

WW.http.Interceptor(() => ({
  request(config) {
    config.headers.token = 'tokennnn'
    loading.className += ' show'
    console.log(WW.http.pendingRequests)
    return config
  },
  response(data) {
    if (!WW.http.pendingRequests.length) {
      loading.className = 'loading'
    }
    return data
  },
  responseError(err) {
    console.log(err)
    loading.className = 'loading'
    console.log(WW.http.pendingRequests)
  },
}))

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
//
//
// WW.http.get('api/users/:userId', {
//   userId: 1,
// }).then((data) => {
//   console.log('success')
//   console.log(data)
// })
//
//
// WW.http.post('api/users',
//   {
//     username: 'ww',
//     age: 22,
//   },
// ).then((data) => {
//   console.log('post success')
//   console.log(data)
//   console.log(data.headers('content-type'))
// })


const btn = document.querySelectorAll('.btn')

upload(btn, {
  url:'/api/upload'
})
