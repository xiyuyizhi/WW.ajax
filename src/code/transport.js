/**
 * Created by xiyuyizhi on 16-12-20.
 */

import Promise from "promise"
import options from "./var/option"
import createXhr from './createXhr'
import merge from "./util/mergeObject"
import paramsParser from "./util/params"
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
        statusText:xhr.statusText
    })
    if(successFn){
        successFn(data,xhr.status,xhr.statusText)
    }
}


/**
 * @param {object} conf options
 */
export default class Transport{

    constructor(conf){
        this.init(conf)
    }

    init(conf){
        const confCopy=merge(clone(options),clone(conf))
        /**
         * 处理传递的参数
         */
        paramsParser(confCopy)
        const xhr = createXhr(confCopy)
        this.conf=confCopy
        this.xhr=xhr
    }

    getPromise(){
        const xhr=this.xhr
        const confCopy=this.conf
        return new Promise(function (resolve, reject) {
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        // promise方式
                        const data = adapterResponse(confCopy.headers.dataType, xhr);
                        resolveFn(data,xhr,confCopy.success,resolve)
                        return
                    }
                    rejectFn(xhr,confCopy.error,reject)
                }
            }
        })
    }

}

