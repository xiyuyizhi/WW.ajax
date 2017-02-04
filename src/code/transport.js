/**
 * Created by xiyuyizhi on 16-12-20.
 */

import Promise from 'promise'
import options from './var/option'
import createXhr from './createXhr'
import merge from './util/mergeObject'
import paramsParser from './util/paramsParser'
import clone from './util/clone'

/**
 *
 * @param {string} dataType 前端处理后台返回数据的格式
 * @param {object} xhr xhr
 * @return {*} 相应格式化后的数据
 */
function adapterResponse(dataType, xhr) {
	let data
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
		case 'buffer':
			data=xhr.response
		default:
	}
	return data
}

/**
 * 错误处理
 * @param {object} xhr xhr
 * @param {function} errorFn error handler
 * @param {function} reject promise reject
 */
function rejectFn(xhr, errorFn, reject) {
	reject({
		status: xhr.status,
		statusText: xhr.statusText,
	})
	if (errorFn) {
		errorFn(xhr.status, xhr.statusText)
	}
}

/**
 * 成功处理函数
 * @param {object} data server data
 * @param {object} xhr xhr
 * @param {function} successFn success handler
 * @param {function} resolve promise resolve
 */
function resolveFn(data, xhr, successFn, resolve) {
	console.log(xhr)
	resolve({
		data,
		status: xhr.status,
		statusText: xhr.statusText,
		headers(key) {
			return xhr.getResponseHeader(key)
		},
	})
	if (successFn) {
		successFn(data, xhr.status, xhr.statusText, key => xhr.getResponseHeader(key))
	}
}


/**
 * @param {object} conf options
 */
export default class Transport {

	/**
	 *
	 * @param {object} conf ajax 配置项
	 * @param {object} interceptor 拦截器，拦击request response responseError
	 * @param {array} pendingRequests 存放正在进行的请求的配置option
	 */
	constructor(conf, interceptor, pendingRequests) {
		this.interceptor = interceptor
		this.pendingRequests = pendingRequests
		this.init(conf)
	}

	/**
	 * 初始化
	 * @param {object} conf 配置项
	 */
	init(conf) {
		conf = merge(clone(options), clone(conf))

		/**
		 * 处理传递的参数
		 */
		paramsParser(conf)
		this.interceptor.request && (conf = this.interceptor.request(conf))
		this.pendingRequests.push(conf)
		const xhr = createXhr(conf)
		this.conf = conf
		this.xhr = xhr
	}

	/**
	 * 包装xhr事件处理程序,返回promise对象
	 * @return {object} promise
	 */
	getPromise() {
		const xhr = this.xhr
		const confCopy = this.conf
		const interceptor = this.interceptor
		const pendingRequests = this.pendingRequests

		xhr.onabort = function () {
			pendingRequests.splice(pendingRequests.indexOf(confCopy), 1)
		}

		return new Promise((resolve, reject) => {
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					pendingRequests.splice(pendingRequests.indexOf(confCopy), 1)
					// success
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
						const data = adapterResponse(confCopy.headers.dataType, xhr)
						interceptor.response && interceptor.response(data)
						resolveFn(data, xhr, confCopy.success, resolve)
						return
					}

					if (confCopy.headers.contentType !== 'multipart') {
						// error
						interceptor.responseError && interceptor.responseError({
							status: xhr.status,
							statusText: xhr.statusText,
						})
						rejectFn(xhr, confCopy.error, reject)
					} else {
						interceptor.response && interceptor.response({
							status: "取消上传成功"
						})
						resolveFn({
							status: "取消上传成功"
						}, xhr, confCopy.success, resolve)
					}

				}
			}
		})
	}

}

