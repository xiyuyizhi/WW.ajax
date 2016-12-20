/**
 * Created by xiyuyizhi on 16-12-20.
 */


export default {

  type: 'get', // 请求类型 get post delete put header
  url: '', // api 地址
  params: '', // ulr ?后跟的参数
  data: '', // post put 请求 body 中携带的数据
  dataType: 'json',   // text|html|json|jsonP 前端接收到数据已什么格式来处理 text/html text/plain application/xml applicaiton/json
  contentType: 'json', // json|text|multipart 后台要求接受的数据的类型 application/x-www-form-urlencoded application/json multipart/form-data
  success: null, //
  error: null, //
}
