/**
 * Created by xiyuyizhi on 16-12-20.
 */

import WW from './code/WW'


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
//   url:'api/users',
//   type:'post',
//   params:{
//     condition:'haha'
//   },
//   data:{
//     username:'ww',
//     age:22
//   }
// }).then(function(data){
//   console.log('post success')
//   console.log(data)
// })


WW.http.Interceptor(function(){
    return {
        request:function(config){
            console.log('................')
            config.headers.token="tokennnn"
            console.log(config)
        }
    }
})

WW.http.get('api/users/:userId',{
  userId:1
}).then(function(data){
  console.log('success')
  console.log(data)
},function(status){
  console.log('error')
  console.log(status)
})



WW.http.post('api/users',null,
    {
        username: 'ww',
        age: 22
    },
    {
        headers:{
            //contentType:'text'
        }
    }
).then(function (data) {
    console.log('post success')
    console.log(data)
})