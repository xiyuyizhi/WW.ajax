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

    [].slice.call(dom)

    conf=merge(defaultOption,conf)

    const filenames=conf.fileName
    const multiple=conf.multiple

    eventHandler.on(dom,'click',function(e){
        const ele=createEle(filenames,multiple) //input file
        e.target.appendChild(ele)
        eventHandler.on(ele,'click',function(e){
            e.stopPropagation()
        })

        /**
         * 上传进度 类型
         */

        switch(conf.showType){
            case 'process':
                initProcessHtml()
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

        processBar(fileList,config.allowSuffix)

        const $uploadProcess=document.querySelector('#uploadProcess')
        const $li=document.querySelectorAll('.processUl li')
        const width=css($li[0],'width');
        css($uploadProcess,'display','block')
        console.log($uploadProcess)
        $uploadProcess.querySelector('.minimize').click();
        [].slice.call(fileList).forEach( (file,index) => {

            const con={
                url:config.url,
                type:'post',
                data:file,
                headers:{
                    contentType:'multipart'
                },
                success:config.success,
                error:config.error,
                uploadProcess:function(e){
                    console.log(e)
                    const currentPercent = e.position / e.totalSize;
                    const $processDiv=$li[index].querySelector(".processDiv");
                    const $percentSpan=$li[index].querySelector('.percent')
                    css($percentSpan,'visibility','visible');
                    $percentSpan.innerHTML=(currentPercent * 100).toFixed(2) + "%"
                    css($processDiv,'width',currentPercent * parseInt(width) + "px");
                }
            }

            HttpFN(con).then(function(){

            })

        })

    }

}


function fileUpload(){

}

export default upload