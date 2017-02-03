/**
 * Created by xiyuyizhi on 17-2-3.
 */


export default function(){
	const loadingHtml=`
			<div id="loadingUpload">
				<span class="loadingTxt"></span>
			</div>
		`
	const div =document.createElement('div')
	div.innerHTML=loadingHtml
	document.querySelector('body').appendChild(div)
}