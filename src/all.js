/**
 * Created by xiyuyizhi on 17-2-4.
 */

import Http from './code/code'
import upload from './code/upload'
import download from "./code/download"

Http['upload']=upload
Http['download']=download

window.evanayf={
	http:Http
}

export default {
	http: Http
}