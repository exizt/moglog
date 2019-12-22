"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.string.repeat");

require("core-js/modules/web.dom-collections.for-each");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*! ===================
 * Mogcha (Table of Contents library)
 *     Repo : https://github.com/exizt/mogcha
 *  Version : 1.0.6
 *   Author : EXIZT
 * Modified : 2019.12
======================= */
(function () {
  var Mogcha =
  /*#__PURE__*/
  function () {
    function Mogcha(options) {
      _classCallCheck(this, Mogcha);

      // toc 를 생성할 selector
      this.tocTarget = options.toc ? options.toc : ''; // contents 를 읽어들일 selector

      this.contextTarget = options.context ? options.context : ''; // anchor 에 붙일 prefix

      this.anchorNamePrefix = options.anchorNamePrefix ? options.anchorNamePrefix : '';
      this.prependHtml = options.prependHtml ? options.prependHtml : '';
      this.tocIn = options.tocIn ? options.tocIn : '';
      this.tocClassName = options.tocClassName ? options.tocClassName : 'toc';
      this.htags = "h1,h2,h3,h4,h5,h6"; // 로그 디버깅 옵션

      this.debug = options.debug ? options.debug : false;
    }

    _createClass(Mogcha, [{
      key: "log",
      value: function log() {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        if (this.debug) console.log(msg);
      }
    }, {
      key: "build",
      value: function build() {
        var _this = this;

        //console.log(this.tocTarget)
        if (this.tocIn != '') {
          var tocInElement = document.body.querySelector(this.tocIn);
          var toc = document.createElement("div");
          toc.setAttribute("class", this.tocClassName);
          tocInElement.prepend(toc);
        } else {
          var toc = document.body.querySelector(this.tocTarget);

          if (!toc) {
            this.log("toc target not founded");
            return false;
          }

          if (this.tocClassName != '') {
            toc.classList.add(this.tocClassName);
          }
        }

        toc.innerHTML = "..."; // 콘텐츠 영역에서 h1~h6 을 읽어온다.

        if (document.body.querySelector(this.contextTarget) != null) {
          var sections = document.body.querySelector(this.contextTarget).querySelectorAll("h1,h2,h3,h4");
        } else {
          return false;
        } // 목록


        var tocTable = {
          items: []
        };
        Array.prototype.forEach.call(sections, function (element, index) {
          //ES5 style
          //sections.forEach((element,index) => { // ES6 style
          var tag = element.tagName; // 해당 구문

          var elText = element.innerText; // anchor 에 사용할 이름

          var aname = _this.anchorNamePrefix + elText + "-" + index; // 컨텍스트 영역의 각 section 에 anchor 를 생성한다.

          var anchor = document.createElement("span"); //anchor.setAttribute("name",aname)

          anchor.setAttribute("id", aname); //anchor.setAttribute("href", "#")
          //anchor.innerHTML = indexNum
          //element.innerHTML = ""
          //element.prepend(anchor)

          element.insertBefore(anchor, element.firstChild); // tocTable 에 추가

          var tocNode = {
            name: aname,
            section: index + 1,
            level: parseInt(tag.slice(-1)),
            text: elText
          };
          tocTable.items.push(tocNode); //console.log(element)
        }); //toc.innerHTML = `<ul>${tocString}</ul>`

        toc.innerHTML = this.prependHtml + this.buildTocString(tocTable); //console.log(this.buildTocString(tocTable));
      }
    }, {
      key: "buildTocString",
      value: function buildTocString(tocTable) {
        //console.log(tocTable)
        var currentCountings = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        var beforeLev = 1;
        var res = '';
        tocTable.items.forEach(function (el, i) {
          var lev = el.level;

          if (beforeLev > lev) {
            currentCountings.forEach(function (item, index) {
              if (index > lev) {
                currentCountings[index] = 0;
              }
            });
          }

          currentCountings[lev]++; //console.log(currentCountings)
          // 숫자 만들기

          var numbering = '';
          currentCountings.forEach(function (item, index) {
            if (index <= lev && index != 0) {
              numbering += "." + item;
            }
          });
          numbering = numbering.substr(1); //console.log(numbering)

          var str = "<a href=\"#".concat(el.name, "\"><span class=\"tocnumber\">").concat(numbering, "</span> <span class=\"toctext\">").concat(el.text, "</span></a>"); //var str = `<a href="#${el.name}">${numbering} ${el.text}</a>` //simple

          if (beforeLev < lev) {
            // 하위 단계로 넘어갈 때
            str = "<ul><li>".concat(str);
          } else if (beforeLev > lev) {
            // 직전보다 상위 단계일 때
            str = '</li>' + '</ul>'.repeat(beforeLev - lev) + "<li>".concat(str);
          } else if (i == 0) {
            str = "<li>".concat(str);
          } else {
            str = "</li><li>".concat(str);
          }

          res += str;
          beforeLev = lev;
        });

        if (tocTable.items.length > 0) {
          res = '<ul>' + res + '</ul>';
        }

        return res;
      }
    }]);

    return Mogcha;
  }();

  window.Mogcha = Mogcha;
})();