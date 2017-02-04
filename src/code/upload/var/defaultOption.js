/**
 * Created by xiyuyizhi on 16-12-26.
 */

export default {
    url: "/",
    maxFileCount:'10',
    fileName:'file', //后台接受数据的属性名
    multiple:'multiple',
    showType:'process', // process|loading 上传中时,交互效果是进度条还是loading
    allowSuffix: 'application/x-rar-compressed,image/jpeg,image/png,application/pdf',
    complete:function(){}
}