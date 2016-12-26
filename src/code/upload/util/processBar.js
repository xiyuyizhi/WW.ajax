/**
 * Created by xiyuyizhi on 16-12-26.
 */

import fileSizeFormat from "./fileSizeFormat"
import checkSuffix from "./checkSuffix"
import css from "./css"

export  default  function (fileList,Suffix) {

    const $ul = document.querySelector('#uploadProcess .processUl')
    let _html = ""
    let UlHeight
    let LisHeight
    for (var i = 0; i < fileList.length; i++) {
        if (i == (fileList.length - 1)) {
            _html += "<li class='lastLi'>";
        }
        else {
            _html += "<li>";
        }
        _html += "<div class='processDiv gradientProcess'></div>";
        _html += "<span class='title'>" + fileList[i].name + "</span>";
        _html += "<span class='size'>" + fileSizeFormat(fileList[i].size) + "</span>";
        if (!checkSuffix(Suffix, fileList[i].type)) {
            _html += "<span class='percent' style='visibility:visible'>已取消</span>";
            _html += "<span class='status cancel' title='取消' style='display:none'></span>";
        } else {
            _html += "<span class='percent'></span>";
            _html += "<span class='status cancel' title='取消'></span>";
        }
        _html += "</li>";
    }

    $ul.innerHTML+=_html;
    document.querySelector('#uploadProcess .headMsg').innerHTML="上传中";
    const $li = document.querySelectorAll('.processUl li');
    const width = css(document.querySelector('#uploadProcess'),'width');
    // $percentSpan = $('#uploadProcess .percent');
    // $status = $("#uploadProcess .status");
    //当li的高度大于UL高度时,Ul加滚动条
    UlHeight = css($ul,'height');
    LisHeight = css($li[0],'height');
    if (UlHeight < LisHeight * $li.length) {
        css($ul,'overflow-y', 'scroll')
    } else {
        css($ul,'overflow-y', 'hidden')
    }


}