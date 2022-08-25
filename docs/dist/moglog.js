export class Moglog {
    constructor(options) {
        this.callbackFunction = null;
        this.isDebug = false;
        this._defaultOptions = {
            toc: '',
            contents: '',
            header: '',
            htags: 'h1,h2,h3,h4,h5,h6',
            position: 'top',
            tocClass: 'moglog-toc',
            linkPrefix: ''
        };
        const opts = Object.assign(Object.assign({}, this._defaultOptions), options);
        this.tocTarget = (typeof opts.toc === 'string') ? opts.toc : this._defaultOptions.toc;
        this.contextTarget = (typeof opts.contents === 'string') ? opts.contents : this._defaultOptions.contents;
        this.headHtml = (typeof opts.header === 'string') ? opts.header : this._defaultOptions.header;
        this.htags = (typeof opts.htags === 'string') ? opts.htags : this._defaultOptions.htags;
        this.tocPosition = (typeof opts.position === 'string') ? opts.position : this._defaultOptions.position;
        this.tocClassName = (typeof opts.tocClass === 'string') ? opts.tocClass : this._defaultOptions.tocClass;
        this.anchorNamePrefix = (typeof opts.linkPrefix === 'string') ? opts.linkPrefix : this._defaultOptions.linkPrefix;
        this.callbackFunction = (typeof opts.callback === 'function') ? opts.callback : null;
        this.isDebug = (opts.isDebug === true) ? true : false;
        if (typeof options.contents === 'undefined') {
            this.contextTarget = this.tocTarget;
        }
    }
    build() {
        document.addEventListener("DOMContentLoaded", () => {
            this.buildHtml();
        });
    }
    callback(args) {
        if (typeof this.callbackFunction === "function") {
            this.callbackFunction(args);
        }
    }
    buildHtml() {
        const tocContainer = document.querySelector(this.tocTarget);
        if (!tocContainer) {
            this.debugLog("toc target not found");
            this.callback(false);
            return false;
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
        if (tocItems.length == 0) {
            this.debugLog("headings not found");
            this.callback(tocItems);
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
        if (this.isDebug) {
            toc.innerHTML = "...";
        }
        toc.innerHTML = this.headHtml + this.buildTocHTMLText(tocItems);
        this.callback(tocItems);
    }
    buildTocHTMLText(_items) {
        let currentCountings = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let beforeLev = 1;
        let res = '';
        _items.forEach((el, i) => {
            const curLevel = el.level;
            if (beforeLev > curLevel) {
                currentCountings.forEach((_, index) => {
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
        if (_items.length > 0) {
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
    debugLog(..._args) {
        if (!this.isDebug)
            return;
        const tag = '[moglog]';
        const args = _args.map((x) => {
            if (typeof x === 'object') {
                return JSON.parse(JSON.stringify(x));
            }
            else {
                return x;
            }
        });
        console.log(tag, ...args);
    }
}
