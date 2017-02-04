/**
 * Created by xiyuyizhi on 16-12-20.
 */



import evanayf from "./all"

const loading = document.querySelector('.loading')

evanayf.http.Interceptor({
  request(config) {
    config.headers.token = 'tokennnn'
    //loading.className += ' show'
    return config
  },
  response(data) {
    if (!evanayf.http.pendingRequests.length) {
      loading.className = 'loading'
    }
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


evanayf.http.get('api/users/:userId', {
  userId: 1,
}).then((data) => {
  console.log('get success')
  console.log(data)
})


evanayf.http.post('api/users',
  {
    username: 'ww',
    age: 22,
  }
).then((data) => {
  console.log('post success')
  console.log(data)
  console.log('get header: '+data.headers('content-type'))
})


evanayf.http.upload('.btn', {
  url:'/api/upload',
  showType:'process',
  complete:function(results){
    console.log('ok')
    console.log(results)
  }
})

evanayf.http.upload('.btn1',{
  url:'/api/upload',
  showType:'loading',
  complete:function(results){
    console.log(results)
  }
})

document.querySelector('.down_file').onclick=function(){
  evanayf.http.download({
    url:'http://www.xiyuyizhi.com:9001/2016-11-17/fa1dda002c675e4f41692ce69aacd1fa.jpg',
    downType:'file'
  });
}


document.querySelector('.down_buffer').onclick=function(){
  evanayf.http.download({
    url:'/rest/pdf/57f3b873a2499c5821437aa2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1SWQiOjEwMDEsImlhdCI6MTQ4NjE4MjAwNCwiZXhwIjoxNDg2MTg1NjA0fQ.1L8Bq974YkvRl-9I1iCkqRl-ZVNBE9VXqWnh5vpkgxg',
    downType:'buffer'
  });
}