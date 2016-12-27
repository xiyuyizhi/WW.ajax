/**
 * Created by xiyuyizhi on 16-12-26.
 */

import defaultOption from "./var/defaultOption"
import eventHandler from "./util/eventHandler"
import initProcessHtml from "./util/initProcessHtml"
import processBar from "./util/processBar"
import checkSuffix from "./util/checkSuffix"
import HttpFN from "../WW"
import merge from "../util/mergeObject"
import css from "./util/css"

import "./css/upload.less"


function upload(dom, conf) {

    const count = {
        fileLen: 0
    };

    [].slice.call(dom)

    conf = merge(defaultOption, conf)
    const promiseArr = [];
    const fileNames = conf.fileName
    const multiple = conf.multiple
    let ele = null
    eventHandler.on(dom, 'click', function (e) {

        function createEle() {
            const ele = document.createElement('input')
            ele.type = 'file'
            ele.name = conf.fileName
            ele.multiple = conf.multiple
            ele.style = 'display:none';
            return ele
        }

        if (!ele) {
            ele = createEle(fileNames, multiple) //input file
            e.target.appendChild(ele)
            eventHandler.on(ele, 'click', function (e) {
                e.stopPropagation()
            })
            eventHandler.on(ele, 'change', function (e) {
                if (conf.showType == 'process') {
                    processHandler([].slice.call(e.target.files), conf)
                }

                if (conf.showType == 'loading') {

                }

                e.target.value = '';//同一张图片也可以多次上传
            })
        }
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

        /**
         * 监听文件变化事件处理
         */
        ele.click();
    })


    function processHandler(fileList, config) {
        const $uploadProcess = document.querySelector('#uploadProcess')
        /**
         * 生成进度条
         */
        processBar(fileList, config.allowSuffix)
        $uploadProcess.querySelector('.headMsg').innerHTML = '上传中'
        $uploadProcess.querySelector('.maximize').click();

        uploading(fileList, count.fileLen, config, promiseArr)

        count.fileLen += fileList.length

        Promise.all(promiseArr).then(function (succs) {
            if(!HttpFN.pendingRequests.length){
                //全部完成
                $uploadProcess.querySelector('.headMsg').innerHTML = '全部完成'
                setTimeout(function () {
                    $uploadProcess.querySelector('.minimize').click();
                }, 500);
            }

        }, function (errors) {
            console.log(errors)
        })

    }

}

/**
 *
 * @param {file} fileList 选择的文件
 * @param {number} originFilesLength 保存的之前已上传的文件数量
 * @param {object} config 配置项
 * @param {promise} promiseArr 用来存放 HttpFn返回的promise
 */
function uploading(fileList, originFilesLength, config, promiseArr) {
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
                const $li = document.querySelectorAll('.processUl li')[originFilesLength + index]
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
                const $li = document.querySelectorAll('.processUl li')[originFilesLength + index]
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
        promiseArr.push(HttpFN(con))
    })
}

export default upload