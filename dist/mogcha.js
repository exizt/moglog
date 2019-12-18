"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*! =======================================================
 * Table of Contents
 *
 *       Repo : https://github.com/e2xist/jquery-sh-table-of-contents
 *    Version : 1.0.1
 *     Author : Hong seok-hoon (e2xist)
 *   Requires : 
 *   Modified : 2019-12
======================================================= */
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
      this.htags = "h1,h2,h3,h4,h5,h6";
      this.prependHtml = options.prependHtml ? options.prependHtml : '';
    }

    _createClass(Mogcha, [{
      key: "build",
      value: function build() {
        var _this = this;

        //console.log(this.tocTarget)
        var toc = document.body.querySelector(this.tocTarget);
        toc.innerHTML = "ddd"; // 콘텐츠 영역에서 h1~h6 을 읽어온다.

        var sections = document.body.querySelector(this.contextTarget).querySelectorAll("h1,h2,h3,h4"); // 목록

        var tocTable = {
          items: []
        };
        sections.forEach(function (element, index) {
          var tag = element.tagName; // 해당 구문

          var elText = element.innerText; // anchor 에 사용할 이름

          var aname = _this.anchorNamePrefix + elText + "-" + index; // 컨텍스트 영역의 각 section 에 anchor 를 생성한다.

          var anchor = document.createElement("span"); //anchor.setAttribute("name",aname)

          anchor.setAttribute("id", aname); //anchor.setAttribute("href", "#")
          //anchor.innerHTML = indexNum
          //element.innerHTML = ""

          element.prepend(anchor); // tocTable 에 추가

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