/**
 * Created by xiyuyizhi on 16-12-26.
 */

import defaultOption from "./var/defaultOption"
import eventHandler from "./util/eventHandler"
import initProcessHtml from "./util/initProcessHtml"
import processBar from "./util/processBar"
import HttpFN from "../WW"
import merge from "../util/mergeObject"
import css from "./util/css"

import "./css/upload.less"


function upload(dom,conf){

    const count={
        fileLen:0
    };

    [].slice.call(dom)

    conf=merge(defaultOption,conf)

    const fileNames=conf.fileName
    const multiple=conf.multiple

    eventHandler.on(dom,'click',function(e){
        const ele=createEle(fileNames,multiple) //input file
        e.target.appendChild(ele)
        eventHandler.on(ele,'click',function(e){
            e.stopPropagation()
        })

        /**
         * 上传进度 类型
         */
        switch(conf.showType){
            case 'process':
                initProcessHtml(count)
                break;
            case  'loading':
                break;
            default:
                throw new Error('need a property showType and the value can be only process or loading')
        }

        /**
         * 监听文件变化事件处理
         */
        eventHandler.on(ele,'change',function(e){
            fileChangeHandler(e.target.files,conf)
            e.target.value='';//同一张图片也可以多次上传了
        })
        ele.click();
    })


    function createEle(){
        const input=document.createElement('input')
        input.type='file'
        input.name=conf.fileName
        input.multiple=conf.multiple
        input.style='display:none';
        return input
    }

    function fileChangeHandler(fileList,config){
        const $uploadProcess=document.querySelector('#uploadProcess')
        /**
         * 生成进度条
         */
        processBar(fileList,config.allowSuffix)
        $uploadProcess.querySelector('.headMsg').innerHTML='上传中'
        $uploadProcess.querySelector('.maximize').click();
        const promiseArr=[];

        (function(originFilesLength){
            [].slice.call(fileList).forEach( (file,index) => {
                const con={
                    url:config.url,
                    type:'post',
                    data:file,
                    headers:{
                        contentType:'multipart',
                        dataType:'text'
                    },
                    success:config.success,
                    error:config.error,
                    uploadProcess:function(e){
                        console.log(count.fileLen)
                        const $li=document.querySelectorAll('.processUl li')[originFilesLength+index]
                        const currentPercent = e.loaded / e.total;
                        const $processDiv=$li.querySelector(".processDiv");
                        const $percentSpan=$li.querySelector('.percent')
                        const width=css.width($li);
                        css($percentSpan,'visibility','visible');
                        $percentSpan.innerHTML=(currentPercent * 100).toFixed(2) + "%"
                        css($processDiv,'width',currentPercent * parseInt(width) + "px");
                        if(currentPercent>=1){
                            //完成
                            const $cancel=$li.querySelector('.cancel')
                            css($processDiv,'display','none')
                            css($percentSpan,'visibility','hidden');
                            $cancel.className='status ok'
                        }
                    }
                }
                promiseArr.push(HttpFN(con))
            })
        })(count.fileLen)

        count.fileLen+=fileList.length

        Promise.all(promiseArr).then(function(){
            //全部完成
            $uploadProcess.querySelector('.headMsg').innerHTML='上传完成'
            setTimeout(function(){
                $uploadProcess.querySelector('.minimize').click();
            },500);
        })

    }

}


function fileUpload(){

}

export default upload