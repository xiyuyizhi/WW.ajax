/**
 * Created by xiyuyizhi on 16-12-26.
 */


/**
 *检测文件后缀
 */

export default function(allowSuffix, fileSuffix) {
    const suffixs = allowSuffix.split(',');
    for (let i = 0; i < suffixs.length; i++) {
        if (suffixs[i].toLowerCase() == fileSuffix) {
            return true;
        }
    }
    return false;
}