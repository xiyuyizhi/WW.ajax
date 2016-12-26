/**
 * Created by xiyuyizhi on 16-12-26.
 */

export default function (dom, prop, value) {

    if (value) {
        //set

        dom.style[prop] = value

    } else {
        //get
        if (window.getComputedStyle) {
            if (window.getComputedStyle.getPropertyValue) {
                return window.getComputedStyle(dom, null).getPropertyValue(prop)
            }
            else {
                return window.getComputedStyle(dom)[prop]
            }
        } else if (dom.currentStyle) {
            return dom.currentStyle[prop]
        }


    }


}