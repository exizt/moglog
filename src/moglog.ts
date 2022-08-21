/**
 * Moglog v2.0.3
 * 
 * License : MIT
 *     Git : https://github.com/exizt/moglog
 *  Author : EXIzT
 */
export class Moglog {
    // toc가 생성될 selector
    private tocTarget: string
    // headings 태그와 분문을 읽어들일 타겟 selector. 여기에 링크가 넘어갈 태그도 생성됨.
    private contextTarget: string
    private anchorNamePrefix: string
    // toc 위에 생성시킬 html
    private headHtml: string
    private tocIn: string
    private tocClassName: string
    private htags: string
    private _isDebug: boolean
    private _callback: any

    private _defaultOptions: IMoglogOptions = {
        toc: '',
        tocIn: 'replace',
        tocClass: 's-toc',
        contents: '',
        linkPrefix: '',
        header: '',
        htags: 'h1,h2,h3,h4,h5,h6',
        isDebug: false,
        callback: null
    }

    /**
     * 생성자
     * 
     * 옵션값을 대입
     * @param {json} options 
     */
    constructor(options: IMoglogOptions) {
        let opts = { ...this._defaultOptions, ...options }

        // toc 를 생성할 selector
        this.tocTarget = (opts.toc) ? opts.toc : this._defaultOptions.toc

        // toc 을 생성할 selector
        this.tocIn = (opts.tocIn) ? opts.tocIn : this._defaultOptions.tocIn!

        // contents 를 읽어들일 selector
        this.contextTarget = (opts.contents) ? opts.contents : this._defaultOptions.contents

        // anchor 에 붙일 prefix
        this.anchorNamePrefix = (opts.linkPrefix) ? opts.linkPrefix : this._defaultOptions.linkPrefix!

        // 앞부분에 붙일 html
        this.headHtml = (opts.header) ? opts.header : this._defaultOptions.header!

        // toc에 붙일 class명
        this.tocClassName = (opts.tocClass) ? opts.tocClass : this._defaultOptions.tocClass!

        // 사용할 h태그 옵션
        this.htags = (opts.htags) ? opts.htags : this._defaultOptions.htags!

        // 로그 디버깅 옵션
        this._isDebug = (opts.isDebug === true) ? true : false

        // callback 옵션
        this._callback = (typeof opts.callback === 'function') ? opts.callback : {}
    }

    /**
     * 콜백 함수
     * @param {object} args 
     */
    callback(args: any) {
        if (typeof this._callback === "function") {
            this._callback(args)
        }
    }

    /**
     * toc 생성
     */
    build() {
        //console.log(this.tocTarget)
        let tocContainer = document.querySelector(this.tocTarget) as HTMLElement
        if (!tocContainer) {
            this.debugLog("toc target not found")
            this.callback(false)
            return false
        }
        let toc = document.createElement("div")
        toc.setAttribute("class", this.tocClassName)

        // tocIn 옵션에 따른 조금 다른 처리
        if (this.tocIn == "prepend") {
            this.prependElement(tocContainer, toc)
            //tocContainer.insertAdjacentElement('afterbegin', toc)
            // tocContainer.prepend(toc)
        } else if (this.tocIn == "append") {
            this.appendElement(tocContainer, toc)
            // tocContainer.appendChild(toc)
            // tocContainer.append(toc)
        } else {
            tocContainer.innerHTML = ""
            this.appendElement(tocContainer, toc)
            // tocContainer.prepend(toc)
            //tocContainer.appendChild(toc)
        }

        // 과정을 살펴보기 위해서 도중에 '...'을 삽입
        if (this._isDebug) {
            toc.innerHTML = "..."
        }

        // 콘텐츠 영역에서 h1~h6 을 읽어온다.
        let sections
        let contextEl = document.querySelector(this.contextTarget)
        if (contextEl != null) {
            // sections = contextEl.querySelectorAll("h1,h2,h3,h4,h5,h6")
            sections = contextEl.querySelectorAll(this.htags)
        } else {
            this.debugLog("context target not found")
            this.callback(false)
            return false
        }

        // 목록 오브젝트 생성
        let tocItems: IMoglogItems[] = []
        //Array.prototype.forEach.call(sections, (element, index) => { //ES5 style
        sections.forEach((_el,i) => { // ES6 style
            const el = _el as HTMLElement

            // let tag = element.tagName
            const level = parseInt(el.tagName.slice(-1))

            // 해당 구문
            const title = el.innerText // 제목들
            const a_name = this.anchorNamePrefix + title + "-" + i // anchor 에 사용할 이름

            // 컨텍스트 영역의 각 section 에 anchor 를 생성한다.
            const contentAnchor = document.createElement("span")
            contentAnchor.setAttribute("id", a_name)
            this.prependElement(el, contentAnchor)

            // tocTable 에 추가
            const tocNode = { aname: a_name, section: i + 1, level: level, text: title }
            tocItems.push(tocNode)
        });

        // html 생성
        toc.innerHTML = this.headHtml + this.buildTocHTMLText(tocItems)

        // callback 호출
        this.callback(tocItems)
    }

    /**
     * toc html string 생성
     * 
     * @param {object}} tocTable 
     */
    buildTocHTMLText(tocItems: IMoglogItems[]) {
        //console.log(tocTable)
        let currentCountings = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        let beforeLev = 1
        let res = ''
        tocItems.forEach((el, i) => {
            const curLevel = el.level
            if (beforeLev > curLevel) {
                currentCountings.forEach((_item, index) => {
                    if (index > curLevel) {
                        currentCountings[index] = 0
                    }
                })
            }
            currentCountings[curLevel]++

            // 숫자 만들기
            let numbering = ''
            currentCountings.forEach((item, index) => {
                if (index <= curLevel && index != 0) {
                    numbering += item + "."
                }
            })

            let str = `<a href="#${el.aname}"><span class="tocnumber">${numbering}</span> <span class="toctext">${el.text}</span></a>`

            if (beforeLev < curLevel) {
                // 하위 단계로 넘어갈 때
                str = `<ul><li>${str}`
            } else if (beforeLev > curLevel) {
                // 직전보다 상위 단계일 때
                // str = '</li>' + this.repeatString('</ul>', (beforeLev - lev)) + `<li>${str}`
                str = '</li>' + '</ul>'.repeat(beforeLev - curLevel) + `<li>${str}`
            } else if (i == 0) {
                str = `<li>${str}`
            } else {
                str = `</li><li>${str}`
            }
            res += str

            beforeLev = curLevel
        })
        if (tocItems.length > 0) {
            res = '<ul>' + res + '</ul>'
        }
        return res
    }
    
    /**
     * es5와 es6에 대응하기 위한 prepend 메소드
     * @param parent 
     * @param child 
     */
    private prependElement(parent?:HTMLElement, child?:HTMLElement){
        if(!!child){
            parent?.insertAdjacentElement('afterbegin', child)
        }
        // parent.prepend(child) //es6
        // parent.insertBefore(child, parent.firstChild) //
    }

    /**
     * es5와 es6에 대응하기 위한 append 메소드
     * @param parent parent element
     * @param child child element will insert
     */
    private appendElement(parent?:HTMLElement, child?:HTMLElement){
        if(!!child){
            parent?.insertAdjacentElement('beforeend', child)
        }
        // parent.appendChild(child)
        // parent.append(child) // es6 
    }
    
    /**
     * 디버깅 로그
     * @param msg 디버깅 로그
     */
     private debugLog(msg?: any) {
        if (this._isDebug) {
            const tag = '[exizt.toc]'
            if(typeof msg === 'object'){
                console.log(tag + ' %o', msg)
            } else {
                console.log(tag, msg)
            }
        }
    }
}

interface IMoglogOptions {
    toc: string;
    tocIn?: string;
    tocClass?: string;
    contents: string;
    htags?: string;
    linkPrefix?: string;
    header?: string;
    callback?: any;
    isDebug?: boolean;
}
interface IMoglogItems {
    aname: string;
    section: number;
    level: number;
    text: string;
}