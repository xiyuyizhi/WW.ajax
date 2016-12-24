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

const loading=document.querySelector('.loading')

WW.http.Interceptor(function(){
    return {
        request:function(config){
            config.headers.token="tokennnn"
            loading.className+=" show"
            console.log(WW.http.pendingRequests)
            return config
        },
        response:function(data){
            if(!WW.http.pendingRequests.length){
                loading.className='loading'
            }

            return data
        },
        responseError:function(err){
            console.log(err)
            console.log(WW.http.pendingRequests)
        }
    }
})

WW.http.get('api/users/:userId',{
  userId:1
}).then(function(data){
  console.log('success')
  console.log(data)
})



WW.http.post('api/users',null,
    {
        username: 'ww',
        age: 22
    },
    {
        headers:{
            contentType:'text'
        }
    }
).then(function (data) {
    console.log('post success')
    console.log(data)
    console.log(data.headers('content-type'))
})