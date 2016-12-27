/**
 * Created by xiyuyizhi on 16-12-26.
 */


function on(doms,eventType, listener, isCapture) {
    var originFn = 'originFn',
        eventTypeFn = eventType + 'Fn';

    if(!doms.length){
        doms=[doms]
    }
    doms.forEach( ele => {
        ele[originFn] = ele[originFn] || [];
        ele[eventTypeFn] = ele[eventTypeFn] || [];
        ele[originFn].push(listener);
        var fn = function (event) {
            event=event || window.event;
            //event.target = event.target || event.srcElement;
            //阻止事件继续传播
            event.stopPropagation = event.stopPropagation || function () {
                    event.cancelBubble = true;//IE
                };
            //阻止默认行为
            event.preventDefault = event.preventDefault || function () {
                    if(event.returnValue){
                        event.returnValue = false
                    }
                    return false;
                };
            listener.call(ele, event);
        };
        ele[eventTypeFn].push(fn);

        if(ele.addEventListener){
            ele.addEventListener(eventType,fn,isCapture)
        }else if(ele.attachEvent){
            ele.attachEvent('on'+eventType,fn)
        }else{
            ele['on'+eventType]=fn;
        }
    })

};

function off(doms,eventType, listener, isCapture) {
    var originFn = 'originFn',
        eventTypeFn = eventType + 'Fn',
        args = arguments;
    if(!doms.length){
        doms=[doms]
    }
    doms.forEach( ele => {
        var index = 0;
        if (args.length == 1) {
            //移除元素指定事件类型的所有事件处理程序
            for (var i = 0; i < ele[eventTypeFn].length; i++) {
                off(ele, eventType, ele[eventTypeFn][i], isCapture);
            }
            ele[originFn] = [];
            ele[eventTypeFn] = [];
        } else {
            //移除元素指定事件类型的指定事件处理程序
            ele[originFn].forEach( (itemListener,dex) => {
                if (itemListener == listener) {
                    index = dex;
                }
            })

            if(ele.removeEventListener){
                ele.removeEventListener(eventType,ele[eventTypeFn][index],isCapture);
            }else if(ele.detachEvent){
                ele.detachEvent('on'+eventType,ele[eventTypeFn][index])
            }else{
                ele['on'+eventType]=null;
            }

            ele[originFn].splice(index, 1);
            ele[eventTypeFn].splice(index, 1);
        }
    })

}

export default {
    on:on,
    off:off
}
