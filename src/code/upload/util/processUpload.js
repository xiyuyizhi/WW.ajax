/**
 * Created by xiyuyizhi on 17-1-18.
 */

import $$ from "../../util/query"
import processBar from "../util/processBar"
import checkSuffix from "../util/checkSuffix"
import Http from "../../code"

/**
 *
 * @param {Array} fileList 选择的文件
 * @param {number} originFilesLength 保存的之前已上传的文件数量
 * @param {object} config 配置项
 * @param {Array} promiseArr 用来存放 Http返回的promise
 */
function doUpload(fileList, config, promiseArr) {
	const originLen=Number(localStorage.getItem('originLen'))//之前已经上传过的数量
	fileList.forEach((file, index) => {
		if (!checkSuffix(config.allowSuffix, file.type)) {
			promiseArr.push(new Promise( (resolve,reject)=>{
				resolve({
					status:0,
					statusText:'文件类型不允许',
					data:file
				})
			}))
			return;
		}
		const con = {
			url: config.url,
			type: 'post',
			data: file,
			headers: {
				contentType: 'multipart',
				dataType: 'text'
			},
			uploadProcess: function (e) {
				const $li = $$('.processUl li').eq(originLen+index)
				const $processDiv = $li.find(".processDiv");
				const $percentSpan = $li.find('.percent')
				const currentPercent = e.loaded / e.total;
				const width = $li.css('width');
				$percentSpan.show().html((currentPercent * 100).toFixed(2) + "%")
				$processDiv.css('width',currentPercent * parseInt(width) + "px")
				if (currentPercent >= 1) {
					//完成
					const $cancel = $li.find('.cancel')
					$processDiv.hide()
					$percentSpan.hide();
					$cancel.removeClass('cancel').addClass('ok')
				}
			},
			abort: function (xhr) {
				/**
				 * 绑定取消事件
				 */
				const $li = $$('.processUl li').eq(originLen+index)
				$li.find('.cancel').on('click', function () {
					xhr.abort();
					$li.find(".processDiv").hide()
					$li.find('.cancel').hide()
					$li.find('.percent').html('已取消')
				})
			}
		}
		promiseArr.push(Http(con))
	})
}

/**
 * 显示效果为process的处理
 */

export default function(fileList, config) {
	const promiseArr = [];
	const $uploadProcess = $$('#uploadProcess')
	/**
	 * 生成进度条
	 */
	processBar(fileList, config.allowSuffix)

	$uploadProcess.find('.headMsg').html('上传中')
	$uploadProcess.find('.maximize').get(0).click();

	if(localStorage.getItem('originLen')){
		localStorage.setItem('originLen',Number(localStorage.getItem('originLen')))
	}else{
		localStorage.setItem('originLen',0)
	}

	doUpload(fileList,config, promiseArr)

	localStorage.setItem('originLen',Number(localStorage.getItem('originLen')) + fileList.length)

	Promise.all(promiseArr).then(function (results) {
		if(!Http.pendingRequests.length){
			//全部完成
			$uploadProcess.find('.headMsg').html('全部完成')
			setTimeout(function () {
				$uploadProcess.find('.minimize').get(0).click();
			}, 500);
		}
		config.complete(results)
	})

}