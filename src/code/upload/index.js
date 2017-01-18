/**
 * Created by xiyuyizhi on 16-12-26.
 */

import defaultOption from "./var/defaultOption"
import initProcessHtml from "./util/initProcessHtml"
import merge from "../util/mergeObject"
import $$ from "./util/query"
import processUpload from "./util/processUpload"
import loadingUpload from "./util/loadingUpload"

import "./css/upload.less"


function upload(selector, conf) {

    conf = merge(defaultOption, conf)
    let ele = null

    $$(selector).on('click',function (e) {

        /**
         * 上传进度 类型
         */
        switch (conf.showType) {
            case 'process':
                if (!document.querySelector('#uploadProcess')) {
                    initProcessHtml()
                }
                break;
            case  'loading':
                break;
            default:
                throw new Error('need a property showType and the value can be only process or loading')
        }

        function createEle(conf) {
            const ele = document.createElement('input')
            ele.type = 'file'
            ele.name = conf.fileName
            ele.multiple = conf.multiple
            ele.style = 'display:none';
            return ele
        }
        if (!ele) {
            ele = createEle(conf) //input file
            e.target.appendChild(ele)
            $$(selector).find('input').on('click',function (e) {
                e.stopPropagation()
            }).on('change',function (e) {
                if (conf.showType == 'process') {
                    processUpload(Array.from(e.target.files), conf)
                }
                if (conf.showType == 'loading') {
                    processUpload(Array.from(e.target.files),conf)
                }
                e.target.value = '';//同一张图片也可以多次上传
            })
        }

        /**
         * 监听文件变化事件处理
         */
        ele.click();
    })
    $$(window).on('beforeunload',function(){
        localStorage.removeItem('originLen')
    })

}


export default upload