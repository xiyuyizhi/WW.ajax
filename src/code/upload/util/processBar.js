/**
 * Created by xiyuyizhi on 16-12-26.
 */

import fileSizeFormat from "./fileSizeFormat"
import checkSuffix from "./checkSuffix"
export  default  function (fileList,Suffix) {

    const $ul = document.querySelector('#uploadProcess .processUl')
    let _html = ""
    for (var i = 0; i < fileList.length; i++) {
        _html+=`<li>
                <div class='processDiv gradientProcess'></div>
                <span class='title'>${fileList[i].name}</span>
                <span class='size'>${fileSizeFormat(fileList[i].size) }</span>`

        if (!checkSuffix(Suffix, fileList[i].type)) {
            _html += `<span class='percent' style='visibility:visible' title="已取消(格式不允许">已取消(格式不允许)</span>
                     <span class='status cancel' title='取消' style='display:none'></span>`
        } else {
            _html += `<span class='percent'></span>
                      <span class='status cancel' title='取消'></span>`;
        }
        _html += "</li>";
    }

    $ul.innerHTML+=_html;
}