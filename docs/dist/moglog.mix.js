var t={716:(t,e,o)=>{o.d(e,{Z:()=>a});var n=o(81),i=o.n(n),r=o(645),s=o.n(r)()(i());s.push([t.id,".moglog-toc{border:1px solid #aaa;background:#f9f9f9 none repeat scroll 0 0;border-radius:.5rem;padding:1rem 1rem;margin:.5rem 0;color:#555;box-sizing:border-box}.moglog-toc ul{padding-left:1.5em}.moglog-toc>ul{padding:0 !important;margin:0 !important}.moglog-toc a{text-decoration:none;color:#007bff}.moglog-toc a:hover{text-decoration:underline;color:#0056b3}.moglog-toc li,.moglog-toc ul,.moglog-toc ul li{list-style:outside none none !important;box-sizing:inherit}",""]);const a=s},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var o="",n=void 0!==e[5];return e[4]&&(o+="@supports (".concat(e[4],") {")),e[2]&&(o+="@media ".concat(e[2]," {")),n&&(o+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),o+=t(e),n&&(o+="}"),e[2]&&(o+="}"),e[4]&&(o+="}"),o})).join("")},e.i=function(t,o,n,i,r){"string"==typeof t&&(t=[[null,t,void 0]]);var s={};if(n)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(s[c]=!0)}for(var l=0;l<t.length;l++){var u=[].concat(t[l]);n&&s[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),o&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=o):u[2]=o),i&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=i):u[4]="".concat(i)),e.push(u))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function o(t){for(var o=-1,n=0;n<e.length;n++)if(e[n].identifier===t){o=n;break}return o}function n(t,n){for(var r={},s=[],a=0;a<t.length;a++){var c=t[a],l=n.base?c[0]+n.base:c[0],u=r[l]||0,d="".concat(l," ").concat(u);r[l]=u+1;var p=o(d),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(h);else{var f=i(h,n);n.byIndex=a,e.splice(a,0,{identifier:d,updater:f,references:1})}s.push(d)}return s}function i(t,e){var o=e.domAPI(e);o.update(t);return function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;o.update(t=e)}else o.remove()}}t.exports=function(t,i){var r=n(t=t||[],i=i||{});return function(t){t=t||[];for(var s=0;s<r.length;s++){var a=o(r[s]);e[a].references--}for(var c=n(t,i),l=0;l<r.length;l++){var u=o(r[l]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}r=c}}},569:t=>{var e={};t.exports=function(t,o){var n=function(t){if(void 0===e[t]){var o=document.querySelector(t);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(t){o=null}e[t]=o}return e[t]}(t);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(o)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,o)=>{t.exports=function(t){var e=o.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(o){!function(t,e,o){var n="";o.supports&&(n+="@supports (".concat(o.supports,") {")),o.media&&(n+="@media ".concat(o.media," {"));var i=void 0!==o.layer;i&&(n+="@layer".concat(o.layer.length>0?" ".concat(o.layer):""," {")),n+=o.css,i&&(n+="}"),o.media&&(n+="}"),o.supports&&(n+="}");var r=o.sourceMap;r&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(n,t,e.options)}(e,t,o)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function o(n){var i=e[n];if(void 0!==i)return i.exports;var r=e[n]={id:n,exports:{}};return t[n](r,r.exports,o),r.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.nc=void 0;var n={};(()=>{o.d(n,{Y:()=>Moglog});var t=o(379),e=o.n(t),i=o(795),r=o.n(i),s=o(569),a=o.n(s),c=o(565),l=o.n(c),u=o(216),d=o.n(u),p=o(589),h=o.n(p),f=o(716),g={};g.styleTagTransform=h(),g.setAttributes=l(),g.insert=a().bind(null,"head"),g.domAPI=r(),g.insertStyleElement=d();e()(f.Z,g);f.Z&&f.Z.locals&&f.Z.locals;class Moglog{constructor(t){this.callbackFunction=null,this.isDebug=!1,this._defaultOptions={toc:"",contents:"",header:"",htags:"h1,h2,h3,h4,h5,h6",position:"top",tocClass:"moglog-toc",linkPrefix:""};const e=Object.assign(Object.assign({},this._defaultOptions),t);this.tocTarget="string"==typeof e.toc?e.toc:this._defaultOptions.toc,this.contextTarget="string"==typeof e.contents?e.contents:this._defaultOptions.contents,this.headHtml="string"==typeof e.header?e.header:this._defaultOptions.header,this.htags="string"==typeof e.htags?e.htags:this._defaultOptions.htags,this.tocPosition="string"==typeof e.position?e.position:this._defaultOptions.position,this.tocClassName="string"==typeof e.tocClass?e.tocClass:this._defaultOptions.tocClass,this.anchorNamePrefix="string"==typeof e.linkPrefix?e.linkPrefix:this._defaultOptions.linkPrefix,this.callbackFunction="function"==typeof e.callback?e.callback:null,this.isDebug=!0===e.isDebug,void 0===t.contents&&(this.contextTarget=this.tocTarget)}build(){document.addEventListener("DOMContentLoaded",(()=>{this.buildHtml()}))}callback(t){"function"==typeof this.callbackFunction&&this.callbackFunction(t)}buildHtml(){const t=document.querySelector(this.tocTarget);if(!t)return this.debugLog("toc target not found"),this.callback(!1),!1;const e=document.querySelector(this.contextTarget);if(!e)return this.debugLog("context target not found"),this.callback(!1),!1;const o=e.querySelectorAll(this.htags);let n=[];if(o.forEach(((t,e)=>{const o=t,i=parseInt(o.tagName.slice(-1)),r=o.innerText,s=this.anchorNamePrefix+r+"-"+e,a=document.createElement("span");a.setAttribute("id",s),this.prependElement(o,a);const c={aname:s,section:e+1,level:i,text:r};n.push(c)})),0==n.length)return this.debugLog("headings not found"),this.callback(n),!1;let i=document.createElement("div");if(i.setAttribute("class",this.tocClassName),"append"==this.tocPosition||"bottom"==this.tocPosition||"after"==this.tocPosition)this.appendElement(t,i);else if("replace"==this.tocPosition)t.innerHTML="",this.appendElement(t,i);else{if("prepend"!=this.tocPosition&&"top"!=this.tocPosition&&"before"!=this.tocPosition)return this.debugLog("position option is not set."),this.callback(!1),!1;this.prependElement(t,i)}this.isDebug&&(i.innerHTML="..."),i.innerHTML=this.headHtml+this.buildTocHTMLText(n),this.callback(n)}buildTocHTMLText(t){let e=[0,0,0,0,0,0,0,0,0],o=1,n="";return t.forEach(((t,i)=>{const r=t.level;o>r&&e.forEach(((t,o)=>{o>r&&(e[o]=0)})),e[r]++;let s="";e.forEach(((t,e)=>{e<=r&&0!=e&&(s+=t+".")}));let a=`<a href="#${t.aname}"><span class="tocnumber">${s}</span> <span class="toctext">${t.text}</span></a>`;a=o<r?`<ul><li>${a}`:o>r?"</li>"+"</ul>".repeat(o-r)+`<li>${a}`:0==i?`<li>${a}`:`</li><li>${a}`,n+=a,o=r})),t.length>0&&(n="<ul>"+n+"</ul>"),n}prependElement(t,e){e&&(null==t||t.insertAdjacentElement("afterbegin",e))}appendElement(t,e){e&&(null==t||t.insertAdjacentElement("beforeend",e))}debugLog(...t){if(!this.isDebug)return;const e=t.map((t=>"object"==typeof t?JSON.parse(JSON.stringify(t)):t));console.log("[moglog]",...e)}}})();var i=n.Y;export{i as Moglog};