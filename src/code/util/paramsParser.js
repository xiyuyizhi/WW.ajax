/**
 * Created by xiyuyizhi on 16-12-23.
 */

/**
 *
 * @param {object} config 配置项
 */
export default function (config) {
  let url = config.url
  const pattern = /:([^/]+)/g
  if (config.params && {}.toString.call(config.params) == '[object Object]') {
    url = url.replace(pattern, (all, capture) => {
      const value = config.params[capture]
      delete config.params[capture]
      return value
    })
    const otherParams = Object.keys(config.params)
    if (otherParams.length) {
      url += '?'
      for (const key of otherParams) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
      config.url = url.substr(0, url.length - 1)
    } else {
      config.url = url
    }
  }
}
