/**
 * Created by xiyuyizhi on 16-12-23.
 */

export default function(obj){
    const newObj={}

    function clone(old,newV) {
        const keys=Object.keys(old)
        for (let key of keys){
            if({}.toString.call(old[key])!==['object Object']){
                newV[key]=old[key]
            }else{
                newV[key]={}
                clone(old[key],newV[key])
            }
        }

    }
    clone(obj,newObj)
    return newObj
}