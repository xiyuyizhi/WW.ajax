/**
 * Created by xiyuyizhi on 16-12-23.
 */


import Transport from './transport'
import valid from './util/valid'

/**
 *
 * @param {object} config ajax配置项
 * @return {*} promise对象
 * @constructor
 */
function HttpFn(config) {
	const key = valid(config)
	if (key) {
		throw new Error(`property ${key} not allowed`)
	}
	const transport = new Transport(config, HttpFn.interceptor, HttpFn.pendingRequests)
	return transport.getPromise()
}

['get', 'post', 'put', 'delete', 'header'].forEach((action) => {
	action = action.toLowerCase()
	HttpFn[action] = function (...args) {
		const conf = {
			type: action,
			url: args[0],
		}
		const argsLen = args.length
		if (action == 'post' || action == 'put') {
			// 最多四个参数 url params data option
			if (argsLen == 2) {
				conf.data = args[1]
			}
			if (argsLen == 3) {
				if (args[2].headers) {
					conf.data = args[1]
					conf.headers = args[2].headers
				} else {
					conf.params = args[1]
					conf.data = args[2]
				}
			}
			if (argsLen == 4) {
				conf.params = args[1]
				conf.data = args[2]
				conf.headers = args[3] && args[3].headers
			}
		} else {
			conf.params = args[1]
			conf.headers = args[2] && args[2].headers
		}
		return new Transport(conf, HttpFn.interceptor, HttpFn.pendingRequests).getPromise()
	}
})

HttpFn.pendingRequests = []

HttpFn.interceptor = {
	request: null,
	response: null,
	responseError: null,
}

HttpFn.Interceptor = function (fn) {
	Object.assign(HttpFn.interceptor,fn)
}


export default HttpFn
