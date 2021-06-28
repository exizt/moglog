"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Moglog v2.0.3
 *
 * License : MIT
 *     Git : https://github.com/exizt/moglog
 *  Author : EXIzT
 */
var Moglog = /** @class */ (function () {
    /**
     * 생성자
     *
     * 옵션값을 대입
     * @param {json} options
     */
    function Moglog(options) {
        this._defaultOptions = {
            toc: '',
            tocIn: 'replace',
            tocClass: 's-toc',
            contents: '',
            linkPrefix: '',
            header: '',
            htags: 'h1,h2,h3,h4,h5,h6',
            isDebug: false,
            callback: null
        };
        var opts = __assign(__assign({}, this._defaultOptions), options);
        // toc 를 생성할 selector
        this.tocTarget = (opts.toc) ? opts.toc : this._defaultOptions.toc;
        // toc 을 생성할 selector
        this.tocIn = (opts.tocIn) ? opts.tocIn : this._defaultOptions.tocIn;
        // contents 를 읽어들일 selector
        this.contextTarget = (opts.contents) ? opts.contents : this._defaultOptions.contents;
        // anchor 에 붙일 prefix
        this.anchorNamePrefix = (opts.linkPrefix) ? opts.linkPrefix : this._defaultOptions.linkPrefix;
        // 앞부분에 붙일 html
        this.prependHtml = (opts.header) ? opts.header : this._defaultOptions.header;
        // toc에 붙일 class명
        this.tocClassName = (opts.tocClass) ? opts.tocClass : this._defaultOptions.tocClass;
        // 사용할 h태그 옵션
        this.htags = (opts.htags) ? opts.htags : this._defaultOptions.htags;
        // 로그 디버깅 옵션
        this._isDebug = (opts.isDebug === true) ? opts.isDebug : false;
        // callback 옵션
        this._callback = (typeof opts.callback === 'function') ? opts.callback : {};
    }
    /**
     * 디버깅 로그
     * @param {string} msg
     */
    Moglog.prototype.log = function (msg) {
        if (this._isDebug)
            console.log("[Moglog console] " + msg);
    };
    /**
     * 콜백 함수
     * @param {object} args
     */
    Moglog.prototype.callback = function (args) {
        if (typeof this._callback === "function") {
            this._callback(args);
        }
    };
    /**
     * toc 생성
     */
    Moglog.prototype.build = function () {
        var _this = this;
        //console.log(this.tocTarget)
        var tocContainer = document.body.querySelector(this.tocTarget);
        if (!tocContainer) {
            this.log("toc target not found");
            this.callback(false);
            return false;
        }
        var toc = document.createElement("div");
        toc.setAttribute("class", this.tocClassName);
        // tocIn 옵션에 따른 조금 다른 처리
        if (this.tocIn == "prepend") {
            this.prependEl(tocContainer, toc);
            //tocContainer.insertAdjacentElement('afterbegin', toc)
            // tocContainer.prepend(toc)
        }
        else if (this.tocIn == "append") {
            this.appendEl(tocContainer, toc);
            // tocContainer.appendChild(toc)
            // tocContainer.append(toc)
        }
        else {
            tocContainer.innerHTML = "";
            this.appendEl(tocContainer, toc);
            // tocContainer.prepend(toc)
            //tocContainer.appendChild(toc)
        }
        // 과정을 살펴보기 위해서 도중에 '...'을 삽입
        if (this._isDebug)
            toc.innerHTML = "...";
        // 콘텐츠 영역에서 h1~h6 을 읽어온다.
        var sections;
        var contextEl = document.body.querySelector(this.contextTarget);
        if (contextEl != null) {
            // sections = contextEl.querySelectorAll("h1,h2,h3,h4,h5,h6")
            sections = contextEl.querySelectorAll(this.htags);
        }
        else {
            this.log("context target not found");
            this.callback(false);
            return false;
        }
        // 목록
        var tocItems = [];
        Array.prototype.forEach.call(sections, function (element, index) {
            //sections.forEach((element,index) => { // ES6 style
            var tag = element.tagName;
            // 해당 구문
            var elText = element.innerText;
            // anchor 에 사용할 이름
            var aname = _this.anchorNamePrefix + elText + "-" + index;
            // 컨텍스트 영역의 각 section 에 anchor 를 생성한다.
            var contentAnchor = document.createElement("span");
            contentAnchor.setAttribute("id", aname);
            _this.prependEl(element, contentAnchor);
            // tocTable 에 추가
            var tocNode = { name: aname, section: index + 1, level: parseInt(tag.slice(-1)), text: elText };
            tocItems.push(tocNode);
        });
        // html 생성
        toc.innerHTML = this.prependHtml + this.buildTocString(tocItems);
        // callback 호출
        this.callback(tocItems);
    };
    /**
     * toc html string 생성
     *
     * @param {object}} tocTable
     */
    Moglog.prototype.buildTocString = function (tocItems) {
        var _this = this;
        //console.log(tocTable)
        var currentCountings = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        var beforeLev = 1;
        var res = '';
        tocItems.forEach(function (el, i) {
            var lev = el.level;
            if (beforeLev > lev) {
                currentCountings.forEach(function (_item, index) {
                    if (index > lev) {
                        currentCountings[index] = 0;
                    }
                });
            }
            currentCountings[lev]++;
            // 숫자 만들기
            var numbering = '';
            currentCountings.forEach(function (item, index) {
                if (index <= lev && index != 0) {
                    numbering += item + ".";
                }
            });
            var str = "<a href=\"#" + el.name + "\"><span class=\"tocnumber\">" + numbering + "</span> <span class=\"toctext\">" + el.text + "</span></a>";
            if (beforeLev < lev) {
                // 하위 단계로 넘어갈 때
                str = "<ul><li>" + str;
            }
            else if (beforeLev > lev) {
                // 직전보다 상위 단계일 때
                str = '</li>' + _this.repeatString('</ul>', (beforeLev - lev)) + ("<li>" + str);
            }
            else if (i == 0) {
                str = "<li>" + str;
            }
            else {
                str = "</li><li>" + str;
            }
            res += str;
            beforeLev = lev;
        });
        if (tocItems.length > 0) {
            res = '<ul>' + res + '</ul>';
        }
        return res;
    };
    /**
     * string.repeat 의 es5 에 해당하는 단순한 polyfill
     * @param string
     * @param times
     * @returns
     */
    Moglog.prototype.repeatString = function (text, times) {
        // es5
        var repeatedString = "";
        while (times > 0) {
            repeatedString += text;
            times--;
        }
        return repeatedString;
        // es6 next
        // return text.repeat(times)
    };
    /**
     * es5와 es6에 대응하기 위한 append 메소드
     * @param parent parent element
     * @param child child element will insert
     */
    Moglog.prototype.appendEl = function (parent, child) {
        parent.insertAdjacentElement('beforeend', child);
        // parent.appendChild(child)
        // parent.append(child) // es6 
    };
    /**
     * es5와 es6에 대응하기 위한 prepend 메소드
     * @param parent
     * @param child
     */
    Moglog.prototype.prependEl = function (parent, child) {
        parent.insertAdjacentElement('afterbegin', child);
        // parent.prepend(child) //es6
        // parent.insertBefore(child, parent.firstChild) //
    };
    return Moglog;
}());
