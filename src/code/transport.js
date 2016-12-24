/**
 * Created by xiyuyizhi on 16-12-20.
 */

import Promise from "promise"
import options from "./var/option"
import createXhr from './createXhr'
import merge from "./util/mergeObject"
import paramsParser from "./util/paramsParser"
import clone from "./util/clone"

function adapterResponse(dataType, xhr) {
    let data;
    switch (dataType) {
        case 'text':
            data = xhr.responseText
            break
        case 'json':
            data = JSON.parse(xhr.responseText)
            break
        case 'xml':
            data = xhr.responseXML
            break
        case 'jsonP':
            break
        default:
    }
    return data;
}

function rejectFn(xhr,errorFn,reject){
    reject({
        status:xhr.status,
        statusText:xhr.statusText
    })
    if (errorFn) {
        errorFn(xhr.status, xhr.statusText)
    }
}

function resolveFn(data,xhr,successFn,resolve){
    resolve({
        data:data,
        status:xhr.status,
        statusText:xhr.statusText,
        headers:function(key){
            return xhr.getResponseHeader(key)
        }
    })
    if(successFn){
        successFn(data,xhr.status,xhr.statusText,function(key){
            return xhr.getResponseHeader(key)
        })
    }
}


/**
 * @param {object} conf options
 */
export default class Transport{

    constructor(conf,interceptor,pendingRequests){
        this.interceptor=interceptor
        this.pendingRequests=pendingRequests
        this.init(conf)
    }

    init(conf){
        conf=merge(clone(options),clone(conf))
        /**
         * 处理传递的参数
         */
        paramsParser(conf)
        this.interceptor.request && (conf=this.interceptor.request(conf))
        this.pendingRequests.push(conf)
        const xhr = createXhr(conf)
        this.conf=conf
        this.xhr=xhr
    }

    getPromise(){
        const xhr=this.xhr
        const confCopy=this.conf
        const interceptor=this.interceptor
        const pendingRequests=this.pendingRequests
        return new Promise(function (resolve, reject) {
            xhr.onreadystatechange = function(){
                //console.log(xhr)
                if (xhr.readyState === 4) {
                    pendingRequests.splice(pendingRequests.indexOf(confCopy),1)
                    //success
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        const data = adapterResponse(confCopy.headers.dataType, xhr);
                        interceptor.response && interceptor.response(data)
                        resolveFn(data,xhr,confCopy.success,resolve)
                        return
                    }
                    //error
                    interceptor.responseError && interceptor.responseError({
                        status:xhr.status,
                        statusText:xhr.statusText
                    })
                    rejectFn(xhr,confCopy.error,reject)
                }
            }
        })
    }

}

