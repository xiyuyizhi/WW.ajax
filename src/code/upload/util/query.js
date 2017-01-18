/**
 * Created by evannayf on 17-1-7.
 */

import cssFn from "./code/css"
import eventHandler from "./code/eventHandler"

class Query{

	constructor(selector){
		this.elements=[]
		this.selector=selector
		this.init()
	}

	init(){
		if(typeof this.selector =='string'){
			this.elements=Array.from(document.querySelectorAll(this.selector))
		}else{
			if(this.selector==window || this.selector==document){
				this.elements.push(this.selector)
			}

		}

	}

	css(...args){

		if(args.length==1){
			//get
			const val=cssFn(this.elements[0],args[0])
			if(val.indexOf('px')!==-1){
				return Number(val.slice(0,val.length-2))
			}
			return val
		}
		if(args.length==2){
			//set
			this.elements.forEach( ele => {
					cssFn(ele,args[0],args[1])
			})
			return this;
		}



	}

	eq(index){
		const newQ=new Query()
		newQ.elements=[this.elements[index]]
		return newQ
	}

	get(index){
		return this.elements[index]
	}

	find(selector){
		let temp=[]
		this.elements.forEach( ele => {
			temp=temp.concat(Array.from(ele.querySelectorAll(selector)))
		})
		const newQ=new Query()
		newQ.elements=temp
		return newQ;
	}

	html(...args){
		if(args.length){
			this.elements.forEach( ele => {
				ele.innerHTML=args[0]
			})
		}else {
			return this.elements[0].innerHTML
		}
		return this
	}

	val(...args){
		if(args.length){
			this.elements[0].innerText? this.elements[0].innerText=args[0] : this.elements[0].textContent=args[0]
		}else{
			return (this.elements[0].innerText || this.elements[0].textContent)
		}
		return this;
	}

	on(...args){
		this.elements.forEach( ele => {
			eventHandler.on(ele,args[0],args[1],args[2])
		})
		return this
	}
	off(...args){
		this.elements.forEach(ele => {
			eventHandler.off(ele,args[0],args[1],args[2])
		})
	}

	show(){
		this.css('display','inline-block')
		return this
	}

	hide(){
		this.css('display','none')
		return this
	}

	addClass(cls){
		this.elements.forEach( ele => {
			ele.className+=" "+cls
		})
		return this
	}

	removeClass(cls){
		this.elements.forEach( ele =>{
			let classArr=ele.className.split(' ')
			classArr=classArr.filter( item => {
				return !(item==cls)
			})
			ele.className=classArr.join(" ")
		})
		return this
	}

	hasClass(cls){
		const pattern=new RegExp('(\\s+'+cls+'|'+cls+'\\s+)')
		for(let ele of this.elements){
			return pattern.test(ele.className)
		}

	}

}

export default function(seletor){
	return new Query(seletor)
}