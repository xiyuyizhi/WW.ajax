/**
 * Created by xiyuyizhi on 16-12-26.
 */

function css(dom, prop, value) {

    if (value) {
        //set
        dom.style[prop] = value

    } else {
        //get
        if (document.defaultView.getComputedStyle) {
            // if (window.getComputedStyle.getPropertyValue) {
            //     return window.getComputedStyle(dom, null).getPropertyValue(prop)
            // }
            // else {
            //     return window.getComputedStyle(dom)[prop]
            // }
            return document.defaultView.getComputedStyle(dom,null)[prop]
        } else if (dom.currentStyle) {
            return dom.currentStyle[prop]
        }


    }
}

css.width=function(dom){
    const w=css(dom,'width')
    return parseFloat(w)
}

css.height=function(dom){
    const h=css(dom,'height');
    return parseFloat(h)
}

export default css