/**
 * Moglog v2.0.1
 * 
 * License : MIT
 *     Git : https://github.com/exizt/moglog
 *  Author : EXIzT
 */
class Moglog {
    private tocTarget: string
    private contextTarget: string
    private anchorNamePrefix: string
    private prependHtml: string
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
        let opts = options || {}
        opts = { ...this._defaultOptions, ...opts }

        // toc 를 생성할 selector
        this.tocTarget = (opts.toc) ? opts.toc : this._defaultOptions.toc

        // toc 을 생성할 selector
        this.tocIn = (opts.tocIn) ? opts.tocIn : this._defaultOptions.tocIn

        // contents 를 읽어들일 selector
        this.contextTarget = (opts.contents) ? opts.contents : this._defaultOptions.contents

        // anchor 에 붙일 prefix
        this.anchorNamePrefix = (opts.linkPrefix) ? opts.linkPrefix : this._defaultOptions.linkPrefix

        // 앞부분에 붙일 html
        this.prependHtml = (opts.header) ? opts.header : this._defaultOptions.header

        // toc에 붙일 class명
        this.tocClassName = (opts.tocClass) ? opts.tocClass : this._defaultOptions.tocClass

        // 사용할 h태그 옵션
        this.htags = (opts.htags) ? opts.htags : this._defaultOptions.htags

        // 로그 디버깅 옵션
        this._isDebug = (opts.isDebug === true) ? opts.isDebug : false

        // callback 옵션
        this._callback = (typeof opts.callback === 'function') ? opts.callback : {}
    }

    /**
     * 디버깅 로그
     * @param {string} msg 
     */
    private log(msg?: string) {
        if (this._isDebug) console.log(`[Moglog console] ${msg}`)
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
        let tocContainer = document.body.querySelector(this.tocTarget)
        if (!tocContainer) {
            this.log("toc target not found")
            this.callback(false)
            return false
        }
        let toc = document.createElement("div")
        toc.setAttribute("class", this.tocClassName)

        // tocIn 옵션에 따른 조금 다른 처리
        if (this.tocIn == "prepend") {
            tocContainer.insertAdjacentElement('afterbegin', toc)
            // tocContainer.prepend(toc)
        } else if (this.tocIn == "append") {
            tocContainer.appendChild(toc)
            // tocContainer.append(toc)
        } else {
            tocContainer.innerHTML = ""
            // tocContainer.prepend(toc)
            tocContainer.appendChild(toc)
        }

        // 과정을 살펴보기 위해서 도중에 '...'을 삽입
        if (this._isDebug) toc.innerHTML = "..."

        // 콘텐츠 영역에서 h1~h6 을 읽어온다.
        let sections
        let contextEl = document.body.querySelector(this.contextTarget)
        if (contextEl != null) {
            // sections = contextEl.querySelectorAll("h1,h2,h3,h4,h5,h6")
            sections = contextEl.querySelectorAll(this.htags)
        } else {
            this.log("context target not found")
            this.callback(false)
            return false
        }

        // 목록
        let tocItems: IMoglogItems[] = []

        Array.prototype.forEach.call(sections, (element, index) => { //ES5 style
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
            let tocNode = { name: aname, section: index + 1, level: parseInt(tag.slice(-1)), text: elText }
            tocItems.push(tocNode)

            //console.log(element)
        });

        //toc.innerHTML = `<ul>${tocString}</ul>`
        //console.log(this.buildTocString(tocItems))
        toc.innerHTML = this.prependHtml + this.buildTocString(tocItems)
        this.callback(tocItems)
    }

    /**
     * toc html string 생성
     * 
     * @param {object}} tocTable 
     */
    buildTocString(tocItems: IMoglogItems[]) {
        //console.log(tocTable)
        let currentCountings = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        let beforeLev = 1
        let res = ''
        tocItems.forEach((el, i) => {
            let lev = el.level
            if (beforeLev > lev) {
                currentCountings.forEach((_item, index) => {
                    if (index > lev) {
                        currentCountings[index] = 0
                    }
                })
            }
            currentCountings[lev]++

            // 숫자 만들기
            let numbering = ''
            currentCountings.forEach((item, index) => {
                if (index <= lev && index != 0) {
                    numbering += item + "."
                }
            })

            let str = `<a href="#${el.name}"><span class="tocnumber">${numbering}</span> <span class="toctext">${el.text}</span></a>`
            //var str = `<a href="#${el.name}">${numbering} ${el.text}</a>` //simple

            if (beforeLev < lev) {
                // 하위 단계로 넘어갈 때
                str = `<ul><li>${str}`
            } else if (beforeLev > lev) {
                // 직전보다 상위 단계일 때
                // str = '</li>' + '</ul>'.repeat(beforeLev - lev) + `<li>${str}`
                str = '</li>' + this.repeatString('</ul>', (beforeLev - lev)) + `<li>${str}`
            } else if (i == 0) {
                str = `<li>${str}`
            } else {
                str = `</li><li>${str}`
            }
            res += str

            beforeLev = lev
        })
        if (tocItems.length > 0) {
            res = '<ul>' + res + '</ul>'
        }
        return res
    }

    /**
     * string.repeat 의 es5 에 해당하는 단순한 polyfill
     * @param string 
     * @param times 
     * @returns 
     */
    private repeatString(text: string, times: number) {
        var repeatedString = "";
        while (times > 0) {
            repeatedString += text;
            times--;
        }
        return repeatedString;
    }

}
interface IMoglogOptions {
    toc: string;
    tocIn: string;
    tocClass: string;
    contents: string;
    htags: string;
    linkPrefix: string;
    header: string;
    callback: any;
    isDebug: boolean;
}
interface IMoglogItems {
    name: string;
    section: number;
    level: number;
    text: string;
}