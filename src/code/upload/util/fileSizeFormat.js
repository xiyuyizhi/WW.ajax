/**
 * Created by xiyuyizhi on 16-12-26.
 */

/**
 * 格式化文件尺寸
 */
export default function (size) {
    if(size/1024/1024>1){
        return (size/1024/1024).toFixed(2)+"M"
    }else{
        return (size/1024).toFixed(2)+"KB"
    }
}