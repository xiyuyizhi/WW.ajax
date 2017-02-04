/**
 * Created by xiyuyizhi on 17-1-18.
 */

import checkSuffix from "../util/checkSuffix"
import $$ from "../../util/query"
import Http from "../../code"


/**
 * 显示效果为loading的处理
 */

function canculateLoaded(arr){
	return arr.reduce( (pre,cur) => {
		return pre+cur
	}, 0)
}

export default function(fileList, config){
	const count=fileList.length
	const promiseArr=[]
	const loadedArr=Array(count).fill().map(item => 0)
	let totalSize=0
	for(const item of fileList){
		totalSize+=item.size
		if (!checkSuffix(config.allowSuffix, item.type)) {
			$$('#loadingUpload').show().find('.loadingTxt').html(`${item.name}格式不允许`)
			setTimeout( function(){
				$$('#loadingUpload').hide()
			},1000)
			return;
		}
	}
	$$('#loadingUpload').show()
	fileList.forEach((file, index) => {
		if (!checkSuffix(config.allowSuffix, file.type)) {
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
				loadedArr[index]=e.loaded
				const percent=(canculateLoaded(loadedArr)/totalSize*100).toFixed(1)
				if(percent<100){
					$$('#loadingUpload').find('.loadingTxt').html(`正在上传${percent}%`)
				}else{
					$$('#loadingUpload').find('.loadingTxt').html(`上传完成`)
					setTimeout( function(){
						$$('#loadingUpload').hide()
					},1000)
				}

			}
		}
		promiseArr.push(Http(con))
	})

	Promise.all(promiseArr).then(function(results){
		config.complete(results)
	})

}