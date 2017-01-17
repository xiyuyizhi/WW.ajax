/**
 * Created by xiyuyizhi on 16-12-26.
 */

import defaultOption from "./var/defaultOption"
import eventHandler from "./util/eventHandler"
import initProcessHtml from "./util/initProcessHtml"
import processBar from "./util/processBar"
import checkSuffix from "./util/checkSuffix"
import Http from "../code"
import merge from "../util/mergeObject"
import css from "./util/css"
import $$ from "./util/query"

import "./css/upload.less"


function upload(selector, conf) {

    const count = {
        fileLen: 0
    };
    conf = merge(defaultOption, conf)
    const promiseArr = [];
    let ele = null

    $$(selector).on('click',function (e) {

        /**
         * 上传进度 类型
         */
        switch (conf.showType) {
            case 'process':
                if (!document.querySelector('#uploadProcess')) {
                    initProcessHtml(count)
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
                    processUpload([].slice.call(e.target.files), conf)
                }
                if (conf.showType == 'loading') {

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

    /**
     * 显示效果为process的处理
     * @param fileList
     * @param config
     */
    function processUpload(fileList, config) {
        const $uploadProcess = $$('#uploadProcess')
        console.log($uploadProcess)
        console.log(JSON.stringify($uploadProcess))
        /**
         * 生成进度条
         */
        processBar(fileList, config.allowSuffix)

        $uploadProcess.find('.headMsg').html('上传中')
        $uploadProcess.find('.maximize').get(0).click();

        if(localStorage.getItem('originLen')){
            localStorage.setItem('originLen',Number(localStorage.getItem('originLen')) + count.fileLen)
        }else{
            localStorage.setItem('originLen',count.fileLen)
        }

        doUpload(fileList,config, promiseArr)

        localStorage.setItem('originLen',Number(localStorage.getItem('originLen')) + fileList.length)

        Promise.all(promiseArr).then(function () {
            if(!Http.pendingRequests.length){
                //全部完成
                $uploadProcess.find('.headMsg').html('全部完成')
                setTimeout(function () {
                    $uploadProcess.find('.minimize').get(0).click();
                }, 500);
            }

        }, function (errors) {
            console.log(errors)
        })

    }

    function loadingUpload(){

    }

}

/**
 *
 * @param {file} fileList 选择的文件
 * @param {number} originFilesLength 保存的之前已上传的文件数量
 * @param {object} config 配置项
 * @param {promise} promiseArr 用来存放 Http返回的promise
 */
function doUpload(fileList, config, promiseArr) {
    const originLen=Number(localStorage.getItem('originLen'))//之前已经上传过的数量
    fileList.forEach((file, index) => {
        if (!checkSuffix(config.allowSuffix, file.type)) {
            return;
        }
        const con = {
            url: config.url,
            type: 'post',
            data: file,
            headers: {
                contentType: 'multipart',
                dataType: 'text'
            },
            success: config.success,
            error: config.error,
            uploadProcess: function (e) {
                const $li = document.querySelectorAll('.processUl li')[originLen+index]
                const $processDiv = $li.querySelector(".processDiv");
                const $percentSpan = $li.querySelector('.percent')
                const currentPercent = e.loaded / e.total;
                const width = css.width($li);
                css($percentSpan, 'display', 'block');
                $percentSpan.innerHTML = (currentPercent * 100).toFixed(2) + "%"
                css($processDiv, 'width', currentPercent * parseInt(width) + "px");
                if (currentPercent >= 1) {
                    //完成
                    const $cancel = $li.querySelector('.cancel')
                    css($processDiv, 'display', 'none')
                    css($percentSpan, 'display', 'none');
                    $cancel.className = 'status ok'
                }
            },
            abort: function (xhr) {
                /**
                 * 绑定取消事件
                 */
                const $li = document.querySelectorAll('.processUl li')[originLen+index]
                const $cancel = $li.querySelector('.cancel')
                const $processDiv = $li.querySelector(".processDiv");
                const $percentSpan = $li.querySelector('.percent')
                eventHandler.on($cancel, 'click', function () {
                    xhr.abort();
                    css($processDiv, 'display', 'none')
                    css($cancel, 'display', 'none')
                    $percentSpan.innerHTML = '已取消';
                })
            }
        }
        promiseArr.push(Http(con))
    })
}

export default upload