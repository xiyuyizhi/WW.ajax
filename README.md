
## WW.ajax 自己分装的ajax类库

---

### 实现点

`

    ajax要支持回调形式和promise形式 
    WW.http({
        url:'',
        method:'',
        data:'',
        dataType:'',
        contentType:'',
        success:'',
        error:''
    })
    WW.http.get({
      url:'',
      dataType:'',
      contentType:'',
      success:'',
      error:''
    })
    
    get post delete put header
    
    WW.http({
            url:'',
            method:'',
            data:'',
            dataType:'',
            contentType:''
        }).then().then()
    WW.http.get().success().error()   
    
    对请求能够修改header
    对相应能够获取header
    
    //全局的处理
    WW.http.Interceptor(fn)    
    WW.http.Start(fn) 
    WW.http.Complete(fn)    
    WW.http.pendingRequests
    
    上传：
    WW.http.upload() 分普通上传和断点续传
    WW.http.download() 分后台返回下载地址和返回二进制数据流
        
`

