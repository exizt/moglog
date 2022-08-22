# Moglog
> h1, h2 태그 등을 읽어서 목차(TOC;Table of Contents)를 생성하는 javascript.


Links
* Git : https://github.com/exizt/moglog
* Demo : https://exizt.github.io/moglog/


# Usage
## 기본적인 사용법 (html에서)
```html
<script type="module">
    import { Moglog } from './dist/moglog.mix.js';
    const moglog = new Moglog(options)
    moglog.build()
</script>
```

## npm, typescript에서 이용할 때
npm 패키지 설치
```console

```

ts 파일에서
```ts
import { Moglog } from 'exizt.moglog'
const moglog = new Moglog({
    toc: "#toc_container"
})
moglog.build()
```

# Options
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


# 사용법 상세
## 간단한 예제
```js
const moglog = new Moglog({
  toc:"#toc",
  contents: "#content"
});
moglog.build()
```

## 헤더에 태그를 추가
```js
const moglog = new Moglog({
  toc: "#toc",
  contents: "#content",
  header: "<h3>목차<h3>"
})
moglog.build()
```


# 브라우저 지원
ie11 미지원


# LICENSE
[MIT](LICENSE)