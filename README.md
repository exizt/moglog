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
| name       | type     | default   | description |
| :---       | :---     | :---:     |:---        |
| toc        | string   | ''        | 목차가 들어갈 곳의 Selector |
| tocIn      | string   | 'replace' | (`replace`,`prepend`,`append`중 하나) `toc`옵션의 selector 영역에서 어디에 위치할 것인지. replace - 덮어씀/prepend - 앞부분에 추가/append - 뒷부분에 추가 |
| tocClass   | string   | ''        | 생성된 목차를 둘러싸는 부분에 추가할 필요가 있는 class명 |
| contents   | string   | ''        | 읽어들일 곳의 Selector |
| linkPrefix | string   | ''        | . |
| header     | string   | ''        | 목차의 앞부분에 붙일 필요가 있는 html |
| callback   | function | null      | 목차 생성후 실행될 함수 |
| isDebug    | boolean  | false     | 디버깅 옵션 |


