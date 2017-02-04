/**
 * Created by xiyuyizhi on 16-12-26.
 */

import $$ from "../../util/query"

function eventListener(uploadProcess){
    const $minimize=uploadProcess.find('.minimize');
    const $maximize=uploadProcess.find('.maximize');
    const $processUl=uploadProcess.find('.processUl')
    //最小化
    $maximize.on('click',function(){
        uploadProcess.show().css('height','400px')
        $minimize.show()
        $maximize.hide()
    })
    $minimize.on('click',function(){
        uploadProcess.css('height','50px')
        $minimize.hide()
        $maximize.show()
    })
    uploadProcess.find('#close').on('click',function(){
        localStorage.removeItem('originLen')
        uploadProcess.hide()
        $processUl.html('')
        //count.fileLen=0
    })
}

export default function(){
    const processHtml=`<div id='uploadProcess'>
                            <p class='head gradientHead'>
                               <span class='headMsg'></span> 
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
    eventListener($$('#uploadProcess'))
}

