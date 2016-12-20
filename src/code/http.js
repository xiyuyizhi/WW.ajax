/**
 * Created by xiyuyizhi on 16-12-20.
 */


import ajax from './ajax'
import merge from './util/mergeObject'
import options from './var/option'


class Http {

    /**
     *
     * @param {object} config ajax配置参数
     */
  constructor(config) {
    this.config = merge(options, config)
    ajax(this.config)
  }

    /**
     *
     * @param {string} url url
     * @param {object} params url?后的参数
     * @param {object} conf 其他配置信息
     */
  get(url, params, conf) {
    console.log(conf)
  }

}

export default Http
