/**
 * Created by xiyuyizhi on 16-12-20.
 */

import Http from "../code"


const config = {
	url: '',
	downType: 'file' //直接下载文件还是字节流 file | buffer
}

function downFile(blob, fileName) {
	console.log(fileName)
	if (window.navigator.msSaveOrOpenBlob) {
		navigator.msSaveBlob(blob, fileName)
	} else {
		const link = document.createElement('a')
		link.href = window.URL.createObjectURL(blob)
		link.download = fileName
		link.click()
		window.URL.revokeObjectURL(link.href)
	}
}

export default function (conf) {
	const con = Object.assign({}, config, conf)
	if (con.downType !== 'file' && con.downType !== 'buffer') {
		throw new Error('type类型只允许为file或buffer')
	}
	if (con.downType == 'buffer') {
		Http({
			url: con.url,
			type: 'get',
			responseType: 'arraybuffer',
			headers:{
				dataType:'buffer'
			}
		}).then(res=> {
			console.log(res)
			const namestr = decodeURIComponent(res.headers('content-disposition').split(' ')[1])
			const blob = new Blob([res.data], {type: res.headers('content-type')})
			console.log(res.headers('content-type'))
			console.log(blob)
			downFile(blob, namestr.split('=')[1])
		})
	} else {
		const tagA = document.createElement('A')
		document.body.appendChild(tagA)
		tagA.target = "_blank"
		tagA.download = "download"
		tagA.href = con.url
		tagA.click()
	}


}


