export class Moglog {
    constructor(options) {
        this._defaultOptions = {
            toc: '',
            position: 'top',
            tocClass: 's-toc',
            contents: '',
            linkPrefix: '',
            header: '',
            htags: 'h1,h2,h3,h4,h5,h6',
            isDebug: false,
            callback: null
        };
        let opts = Object.assign(Object.assign({}, this._defaultOptions), options);
        this.tocTarget = (opts.toc) ? opts.toc : this._defaultOptions.toc;
        this.tocPosition = (opts.position) ? opts.position : this._defaultOptions.position;
        this.contextTarget = (opts.contents) ? opts.contents : this._defaultOptions.contents;
        this.anchorNamePrefix = (opts.linkPrefix) ? opts.linkPrefix : this._defaultOptions.linkPrefix;
        this.headHtml = (opts.header) ? opts.header : this._defaultOptions.header;
        this.tocClassName = (opts.tocClass) ? opts.tocClass : this._defaultOptions.tocClass;
        this.htags = (opts.htags) ? opts.htags : this._defaultOptions.htags;
        this._isDebug = (opts.isDebug === true) ? true : false;
        this._callback = (typeof opts.callback === 'function') ? opts.callback : {};
    }
    callback(args) {
        if (typeof this._callback === "function") {
            this._callback(args);
        }
    }
    build() {
        document.addEventListener("DOMContentLoaded", () => {
            this.buildHtml();
        });
    }
    buildHtml() {
        const tocContainer = document.querySelector(this.tocTarget);
        if (!tocContainer) {
            this.debugLog("toc target not found");
            this.callback(false);
            return false;
        }
        let toc = document.createElement("div");
        toc.setAttribute("class", this.tocClassName);
        if (this.tocPosition == "append" || this.tocPosition == "bottom" || this.tocPosition == "after") {
            this.appendElement(tocContainer, toc);
        }
        else if (this.tocPosition == "replace") {
            tocContainer.innerHTML = "";
            this.appendElement(tocContainer, toc);
        }
        else if (this.tocPosition == "prepend" || this.tocPosition == "top" || this.tocPosition == "before") {
            this.prependElement(tocContainer, toc);
        }
        else {
            this.debugLog("position option is not set.");
            this.callback(false);
            return false;
        }
        if (this._isDebug) {
            toc.innerHTML = "...";
        }
        const contextContainer = document.querySelector(this.contextTarget);
        if (!contextContainer) {
            this.debugLog("context target not found");
            this.callback(false);
            return false;
        }
        const sections = contextContainer.querySelectorAll(this.htags);
        let tocItems = [];
        sections.forEach((_el, i) => {
            const el = _el;
            const level = parseInt(el.tagName.slice(-1));
            const title = el.innerText;
            const a_name = this.anchorNamePrefix + title + "-" + i;
            const contentAnchor = document.createElement("span");
            contentAnchor.setAttribute("id", a_name);
            this.prependElement(el, contentAnchor);
            const tocNode = { aname: a_name, section: i + 1, level: level, text: title };
            tocItems.push(tocNode);
        });
        toc.innerHTML = this.headHtml + this.buildTocHTMLText(tocItems);
        this.callback(tocItems);
    }
    buildTocHTMLText(tocItems) {
        let currentCountings = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let beforeLev = 1;
        let res = '';
        tocItems.forEach((el, i) => {
            const curLevel = el.level;
            if (beforeLev > curLevel) {
                currentCountings.forEach((_item, index) => {
                    if (index > curLevel) {
                        currentCountings[index] = 0;
                    }
                });
            }
            currentCountings[curLevel]++;
            let numbering = '';
            currentCountings.forEach((item, index) => {
                if (index <= curLevel && index != 0) {
                    numbering += item + ".";
                }
            });
            let str = `<a href="#${el.aname}"><span class="tocnumber">${numbering}</span> <span class="toctext">${el.text}</span></a>`;
            if (beforeLev < curLevel) {
                str = `<ul><li>${str}`;
            }
            else if (beforeLev > curLevel) {
                str = '</li>' + '</ul>'.repeat(beforeLev - curLevel) + `<li>${str}`;
            }
            else if (i == 0) {
                str = `<li>${str}`;
            }
            else {
                str = `</li><li>${str}`;
            }
            res += str;
            beforeLev = curLevel;
        });
        if (tocItems.length > 0) {
            res = '<ul>' + res + '</ul>';
        }
        return res;
    }
    prependElement(parent, child) {
        if (!!child) {
            parent === null || parent === void 0 ? void 0 : parent.insertAdjacentElement('afterbegin', child);
        }
    }
    appendElement(parent, child) {
        if (!!child) {
            parent === null || parent === void 0 ? void 0 : parent.insertAdjacentElement('beforeend', child);
        }
    }
    debugLog(msg) {
        if (this._isDebug) {
            const tag = '[exizt.toc]';
            if (typeof msg === 'object') {
                console.log(tag + ' %o', msg);
            }
            else {
                console.log(tag, msg);
            }
        }
    }
}
