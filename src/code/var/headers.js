/**
 * Created by evannayf on 16-12-24.
 */

export default {

    'contentType':{
        name:'Content-Type',
        json: 'application/json',
        text: 'application/x-www-form-urlencoded',
        multipart: 'multipart/form-data'
    },
    'dataType':{
        name:'Accept',
        json: 'application/json, text/javascript, */*; q=0.01',
        text: 'text/plain, */*; q=0.01',
        html: 'text/html, */*; q=0.01'
    },
    'withCredentials':{
        name:'withCredentials',
        true:true,
        false:false
    }

}