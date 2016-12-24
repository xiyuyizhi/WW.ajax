/**
 * Created by xiyuyizhi on 16-12-23.
 */


import Transport from "./transport"
import merge from "./util/mergeObject"

function HttpFn(config) {
    //HttpFn.start()
    const transport = new Transport(config,HttpFn.interceptor,HttpFn.pendingRequests)
    return transport.getPromise()
}

['get', 'post', 'put', 'delete', 'header'].forEach(action => {
    action = action.toLowerCase()
    HttpFn[action] = function (...args) {
        const conf = {
            type: action,
            url: args[0]
        }
        if (action == 'post' || action == 'put') {
            conf.params = args[1]
            conf.data = args[2]
            conf.headers = args[3] && args[3].headers
        } else {
            conf.params = args[1]
            conf.headers = args[2] && args[2].headers
        }
        return new Transport(conf,HttpFn.interceptor,HttpFn.pendingRequests).getPromise()
    }
})

HttpFn.pendingRequests=[]


HttpFn.interceptor={
    request:null,
    response:null,
    responseError:null
}
HttpFn.Interceptor=function(fn){
    merge(HttpFn.interceptor,fn())
}

const WW = {
    http: HttpFn
}


export default WW