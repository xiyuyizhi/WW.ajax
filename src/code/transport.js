/**
 * Created by xiyuyizhi on 16-12-20.
 */

import Promise from "promise"
import createXhr from './createXhr'
import options from "./var/option"
import merge from "./util/mergeObject"

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
        statusText:xhr.statusText
    })
    if(successFn){
        successFn(data,xhr.status,xhr.statusText)
    }
}

/**
 * @param {object} conf options
 */
export default function (conf) {
    conf=merge(options,conf)
    console.log(conf)
    const xhr = createXhr(conf)

    return new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    // promise方式
                    const data = adapterResponse(conf.headers.dataType, xhr);
                    resolveFn(data,xhr,conf.success,resolve)
                    return
                }
                rejectFn(xhr,conf.error,reject)
            }
        }
    })
}
