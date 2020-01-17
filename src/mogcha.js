/*! mogcha v1.0.9 https://github.com/exizt/mogcha */
/*
 * Mogcha (Table of Contents library)
 *     Repo : https://github.com/exizt/mogcha
 *   Author : EXIZT
 * Modified : 2020.01
*/
(function(){
	class Mogcha {
		constructor(options){
			// toc 를 생성할 selector
			this.tocTarget = (options.toc) ? options.toc : ''
			// contents 를 읽어들일 selector
			this.contextTarget = (options.context) ? options.context : ''

			// anchor 에 붙일 prefix
			this.anchorNamePrefix = (options.anchorNamePrefix) ? options.anchorNamePrefix : ''
			this.prependHtml = (options.prependHtml) ? options.prependHtml : ''
			this.tocIn = (options.tocIn) ? options.tocIn : ''
			this.tocClassName = (options.tocClassName) ? options.tocClassName : ''
			this.htags = "h1,h2,h3,h4,h5,h6"
			// 로그 디버깅 옵션
			this.debug = (options.debug) ? options.debug : false
		}

		log(msg = ''){
			if(this.debug) console.log(`[Mogcha console] ${msg}`)
		}

		build(){
			//console.log(this.tocTarget)
			if(this.tocIn != ''){
				var tocInElement = document.body.querySelector(this.tocIn)
				var toc = document.createElement("div")
				toc.setAttribute("class", this.tocClassName)
				tocInElement.prepend(toc)
			} else {
				var toc = document.body.querySelector(this.tocTarget)
				if(!toc){
					this.log("toc target not found")
					return false
				} 
				if(this.tocClassName != ''){
					toc.classList.add(this.tocClassName);
				}
			}
			if(this.debug) toc.innerHTML = "..."

			// 콘텐츠 영역에서 h1~h6 을 읽어온다.
			if(document.body.querySelector(this.contextTarget) != null){
				var sections  = document.body.querySelector(this.contextTarget).querySelectorAll("h1,h2,h3,h4")
			} else {
				this.log("context target not found")
				return false
			}

			// 목록
			var tocTable = {
				items:[]
			}
			

			Array.prototype.forEach.call(sections, (element,index) => { //ES5 style
			//sections.forEach((element,index) => { // ES6 style
				let tag = element.tagName

				// 해당 구문
				let elText = element.innerText

				// anchor 에 사용할 이름
				let aname = this.anchorNamePrefix + elText + "-" + index

				// 컨텍스트 영역의 각 section 에 anchor 를 생성한다.
				let anchor = document.createElement("span")
				//anchor.setAttribute("name",aname)
				anchor.setAttribute("id", aname)
				//anchor.setAttribute("href", "#")
				//anchor.innerHTML = indexNum
				//element.innerHTML = ""
				//element.prepend(anchor)
				element.insertBefore(anchor, element.firstChild);

				// tocTable 에 추가
				let tocNode = {name: aname, section : index+1, level : parseInt(tag.slice(-1)), text : elText}
				tocTable.items.push(tocNode)

				//console.log(element)
			});

			//toc.innerHTML = `<ul>${tocString}</ul>`

			toc.innerHTML = this.prependHtml + this.buildTocString(tocTable)
			//console.log(this.buildTocString(tocTable));
		}

		buildTocString(tocTable){
			//console.log(tocTable)
			var currentCountings = [0,0,0,0,0,0,0,0,0]
			var beforeLev = 1
			var res = ''
			tocTable.items.forEach((el, i) => {
				let lev = el.level
				if(beforeLev > lev){
					currentCountings.forEach((item,index)=>{
						if(index > lev){
							currentCountings[index] = 0
						}
					})
				}
				currentCountings[lev]++
				//console.log(currentCountings)

				// 숫자 만들기
				let numbering = ''
				currentCountings.forEach((item,index)=>{
					if(index <= lev && index != 0){
						numbering += "." +item
					}
				})
				numbering = numbering.substr(1)
				//console.log(numbering)

				var str = `<a href="#${el.name}"><span class="tocnumber">${numbering}</span> <span class="toctext">${el.text}</span></a>`
				//var str = `<a href="#${el.name}">${numbering} ${el.text}</a>` //simple


				if(beforeLev < lev){
					// 하위 단계로 넘어갈 때
					str = `<ul><li>${str}`
				} else if(beforeLev > lev){
					// 직전보다 상위 단계일 때
					str = '</li>' + '</ul>'.repeat(beforeLev - lev) + `<li>${str}`
				} else if(i == 0){
					str = `<li>${str}`
				} else {
					str = `</li><li>${str}`
				}
				res += str

				beforeLev = lev
			})
			if(tocTable.items.length > 0){
				res = '<ul>'+ res +'</ul>'
			}
			return res
		}
	}
	window.Mogcha = Mogcha
})()