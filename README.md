# Moglog
목차를 생성하는 스크립트


# License
MIT License


# Links
* git : https://github.com/exizt/moglog
* demo pages : https://exizt.github.io/moglog/


# 사용법
```html
<script src="dist/moglog.min.js"></script>
```


# Options
| name             | type     | description |
| :---             | :---:    | :---        |
| target           | string   | 목차가 들어갈 곳의 Selector |
| contents         | string   | 읽어들일 곳의 Selector |
| targetIn         | string   | `target`대신에 특정 영역의 상단에 자동으로 붙게할 경우 |
| anchorNamePrefix | string   |  |
| tocClassName     | string   | 생성된 목차를 둘러싸는 부분에 추가할 필요가 있는 class명 (기본값: `empty string`)  |
| debug            | boolean  | 디버깅 옵션 (기본값: `false`) |
| prependHtml      | string   | 목차의 앞부분에 붙일 필요가 있는 html (기본값: `empty string`) |
| callback         | function | 목차 생성후 실행될 함수 (기본값: `null`) |


