# Moglog
> h1, h2 태그 등을 읽어서 목차(TOC;Table of Contents)를 생성하는 javascript.


Links
* GitHub: https://github.com/exizt/moglog
* Demo: https://exizt.github.io/moglog/
* npm: https://www.npmjs.com/package/exizt.moglog



## Usage
### html
1. 소스 파일을 다운로드 받고, 다음의 코드 삽입.

```html
<script type="module">
    import { Moglog } from './dist/moglog.mix.js';
    const moglog = new Moglog(options)
    moglog.build()
</script>
```

파일 목록
* `dist/moglog.mix.js` : `css`를 포함한 `js`파일
* `dist/moglog.js` : `css`를 제외한 `js`파일
* `dist/moglog.css` : toc를 위한 styles


#### using CDN
```html
<script type="module">
import { Moglog } from 'https://cdn.jsdelivr.net/gh/exizt/moglog@main/dist/moglog.mix.js'
const moglog = new Moglog({
    toc: ".contents_style",
    header: "<span class='title'>Table of Contents</span>"
})
moglog.build()
</script>
```

### using npm
npm 패키지 설치
```shell
npm i exizt.moglog
```


```ts
import { Moglog } from 'exizt.moglog'
const moglog = new Moglog({
    toc: "#toc_container"
})
moglog.build()
```

## Customize
### Options
| name                 | type       | default               | description        |
| :---                 | :---       | :---:                 |:---                |
| `options.toc`        | `String`   | ''                    | 목차가 들어갈 곳의 Selector |
| `options.contents`   | `String`   | ''                    | 읽어들일 곳의 Selector |
| `options.header`     | `String`   | ''                    | 목차의 앞부분에 붙일 필요가 있는 html |
| `options.htags`      | `String`   | `'h1,h2,h3,h4,h5,h6'` | 읽어들일 h태그 종류 Selector |
| `options.linkPrefix` | `String`   | ''                    | 링크에 붙게될 prefix |
| `options.tocClass`   | `String`   | `'moglog-toc'`        | 생성된 목차를 둘러싸는 부분에 사용할 클래스명 |
| `options.callback`   | `Function` | `null`                | 목차 생성후 실행될 함수 |
| `options.position`   | `String`   | `'top'`               | `toc` 옵션에서 지정한 영역에서 어디에 위치할 지. <br>- `top` \| `prepend`  \| `before` : 상단에 위치<br>- `replace` : 덮어씀<br>- `bottom`  \| `append`  \| `after` : 뒤에 위치 |


### how to use
#### 간단한 예제
```js
const moglog = new Moglog({
  toc:"#toc",
  contents: "#content"
});
moglog.build()
```

#### 헤더에 태그를 추가
```js
const moglog = new Moglog({
  toc: "#toc",
  contents: "#content",
  header: "<h3>Table of Contents<h3>"
})
moglog.build()
```


## 브라우저 지원
ie11 미지원
