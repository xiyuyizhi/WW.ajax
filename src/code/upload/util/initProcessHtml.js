/**
 * Created by xiyuyizhi on 16-12-26.
 */

import eventHandler from "./eventHandler"
import css from "./css"

function eventListener(uploadProcess){
    const $minimize=uploadProcess.querySelector('.minimize');
    const $maximize=uploadProcess.querySelector('.maximize');
    const $close=uploadProcess.querySelector('#close');
    const $processUl=uploadProcess.querySelector('.processUl')
    //最小化
    eventHandler.on($minimize,'click',function(){
        css(uploadProcess,'height','400px')
        css($minimize,'display','block')
        css($maximize,'display','none')
    })
    eventHandler.on($maximize,'click',function(){
        css(uploadProcess,'height','50px')
        css($minimize,'display','none')
        css($maximize,'display','block')
    })
    eventHandler.on($close,'click',function(){
        css(uploadProcess,'display','none')
        $processUl.innerHTML=''
    })

}

export default function(){
    const processHtml=`<div id='uploadProcess'>
                            <p class='head gradientHead'>
                               <span class='headMsg'>上传中</span> 
                               <span class='menu'>
                                   <span class='minimize'></span>
                                    <span class='maximize'></span>
                                    <span id='close'>X</span>
                               </span>  
                            </p>    
                            <ul class='processUl'>
                            </ul>  
                          </div>`
    const div =document.createElement('div')
    div.innerHTML=processHtml

    document.querySelector('body').appendChild(div)

    const uploadProcess=document.querySelector('#uploadProcess')
    eventListener(uploadProcess)
}
