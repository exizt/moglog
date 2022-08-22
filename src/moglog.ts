/**
 * Moglog
 * 
 * License : MIT
 *     Git : https://github.com/exizt/moglog
 *  Author : exizt
 */
export class Moglog {
    // toc가 생성될 selector
    private tocTarget: string
    // headings 태그와 분문을 읽어들일 타겟 selector. 여기에 링크가 넘어갈 태그도 생성됨.
    private contextTarget: string
    // toc 위에 생성시킬 html
    private headHtml: string
    // 사용할 htags에 대한 selector
    private htags: string
    // toc이 tocTarget 내부에서 위치할 장소
    private tocPosition: string
    // toc element에 붙는 class 명
    private tocClassName: string
    // 링크에 붙일 prefix
    private anchorNamePrefix: string
    // callback 옵션
    private callbackFunction: Function|null = null
    // 로그 디버깅 옵션
    private isDebug: boolean = false
    // 기본 옵션값
    private readonly _defaultOptions: IMoglogOptions = {
        toc: '',
        contents: '',
        header: '',
        htags: 'h1,h2,h3,h4,h5,h6',
        position: 'top',
        tocClass: 'moglog-toc',
        linkPrefix: ''
    }

    /**
     * 생성자
     * @param options 
     */
    constructor(options: IMoglogOptions) {
        /**
         * 옵션 셋팅
         */
        // merge
        const opts = { ...this._defaultOptions, ...options }
        // 옵션값들의 유효성 확인 및 유효성 벗어날 경우 기본값으로 재지정
        opts.toc = (typeof opts.toc === 'string') ? opts.toc : this._defaultOptions.toc
        opts.contents = (typeof opts.contents === 'string') ? opts.contents : this._defaultOptions.contents
        opts.header = (typeof opts.header === 'string') ? opts.header : this._defaultOptions.header
        opts.htags = (typeof opts.htags === 'string') ? opts.htags : this._defaultOptions.htags
        opts.position = (typeof opts.position === 'string') ? opts.position : this._defaultOptions.position
        opts.tocClass = (typeof opts.tocClass === 'string') ? opts.tocClass : this._defaultOptions.tocClass
        opts.linkPrefix = (typeof opts.linkPrefix === 'string') ? opts.linkPrefix : this._defaultOptions.linkPrefix
        opts.callback = (typeof opts.callback === 'function') ? opts.callback : null
        opts.isDebug = (!!opts.isDebug) ? true : false

        // 옵션값을 멤버에 지정
        this.tocTarget = opts.toc
        this.contextTarget = opts.contents!
        this.headHtml = opts.header!
        this.htags = opts.htags!
        this.tocPosition = opts.position!
        this.tocClassName = opts.tocClass!
        this.anchorNamePrefix = opts.linkPrefix!
        this.callbackFunction = opts.callback!
        this.isDebug = opts.isDebug!

        // contents 옵션이 아예 없었던 경우는, toc과 같은 엘리먼트일 것으로 가정한다.
        if(typeof options.contents === 'undefined'){
            this.contextTarget = this.tocTarget
        }
    }

    /**
     * 콜백 함수
     * @param {object} args 
     */
    callback(args: any) {
        if (typeof this.callbackFunction === "function") {
            this.callbackFunction(args)
        }
    }

    /**
     * toc html 생성
     */
    build(){
        document.addEventListener("DOMContentLoaded", ()=> {
            this.buildHtml()
        })
    }

    /**
     * toc html 생성 부분
     */
    buildHtml() {
        //console.log(this.tocTarget)
        
        ///// toc을 생성할 container 탐색
        const tocContainer = document.querySelector(this.tocTarget) as HTMLElement
        if (!tocContainer) {
            ///// toc이 생성될 엘리먼트가 없으므로 중지
            this.debugLog("toc target not found")
            this.callback(false)
            return false
        }

        /*
        * context에서 h 태그를 탐색하고, 링크를 받을 수 있도록 span 태그로 id를 지정함
        */
        // context 영역
        const contextContainer = document.querySelector(this.contextTarget)
        if(!contextContainer){
            ///// context를 탐색할 엘리먼트가 없으므로 중지
            this.debugLog("context target not found")
            this.callback(false)
            return false
        }
        // context 영역에서 h1~h6 을 읽어온다.
        const sections = contextContainer.querySelectorAll(this.htags)
        // sections = contextContainer.querySelectorAll("h1,h2,h3,h4,h5,h6")

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
        })

        // headings 태그 요소가 없으므로, 생성하지 않고 리턴
        if(tocItems.length == 0){
            this.debugLog("headings not found")
            this.callback(tocItems)
            return false
        }

        // toc을 생성할 div 엘리먼트 생성
        let toc = document.createElement("div")
        toc.setAttribute("class", this.tocClassName)

        // tocPosition 옵션에 따른 조금 다른 처리
        if (this.tocPosition == "append" || this.tocPosition == "bottom" || this.tocPosition == "after") {
            this.appendElement(tocContainer, toc)
        } else if (this.tocPosition == "replace") {
            tocContainer.innerHTML = ""
            this.appendElement(tocContainer, toc)
        } else if (this.tocPosition == "prepend" || this.tocPosition == "top" || this.tocPosition == "before") {
            this.prependElement(tocContainer, toc)
        } else {
            this.debugLog("position option is not set.")
            this.callback(false)
            return false
        }

        // 과정을 살펴보기 위해서 도중에 '...'을 삽입
        if (this.isDebug) {
            toc.innerHTML = "..."
        }

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
    buildTocHTMLText(_items: IMoglogItems[]) {
        //console.log(tocTable)
        let currentCountings = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        let beforeLev = 1
        let res = ''
        _items.forEach((el, i) => {
            const curLevel = el.level
            if (beforeLev > curLevel) {
                currentCountings.forEach((_, index) => {
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
        if (_items.length > 0) {
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
     private debugLog(msg: any) {
        if (this.isDebug) {
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
    contents?: string;
    header?: string;
    htags?: string;
    position?: string;
    tocClass?: string;
    linkPrefix?: string;
    callback?: Function|null;
    isDebug?: boolean;
}
interface IMoglogItems {
    aname: string;
    section: number;
    level: number;
    text: string;
}