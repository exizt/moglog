# Moglog
목차를 생성하는 스크립트


# License
MIT License


# Links
* Git : https://github.com/exizt/moglog
* Demo : https://exizt.github.io/moglog/


# 사용법
## 최신 브라우저
```html
<script src="./dist/moglog.min.js"></script>
<script>
    document.addEventListener("DOMContentLoaded",()=>{
        var moglog = new Moglog({
            toc:".toc-container",
            contents: "#contents"
        })
        moglog.build()
    });
</script>
```

## IE11 등을 지원하려면 (ES5)
```html
<script src="./dist/moglog.es5.min.js"></script>
<script>
    document.addEventListener("DOMContentLoaded",function(){
        var moglog = new Moglog({
            toc:".toc-container",
            contents: "#contents"
        })
        moglog.build()
    });
</script>
```


# Options
| 옵션명      | 유형     | 기본값    | 설명        |
| :---       | :---     | :---:     |:---        |
| toc        | string   | ''        | 목차가 들어갈 곳의 Selector |
| tocIn      | string   | 'replace' | (`replace`,`prepend`,`append`중 하나) `toc`옵션의 selector 영역에서 어디에 위치할 것인지. replace - 덮어씀/prepend - 앞부분에 추가/append - 뒷부분에 추가 |
| tocClass   | string   | ''        | 생성된 목차를 둘러싸는 부분에 추가할 필요가 있는 class명 |
| contents   | string   | ''        | 읽어들일 곳의 Selector |
| htags      | string   | 'h1,h2..' | 읽어들일 h태그 종류 (빈칸없이 순서대로 작성) |
| linkPrefix | string   | ''        | 링크에 붙게될 prefix |
| header     | string   | ''        | 목차의 앞부분에 붙일 필요가 있는 html |
| callback   | function | null      | 목차 생성후 실행될 함수 |
| isDebug    | boolean  | false     | 디버깅 옵션 |



# 브라우저 지원
* moglog(.min).js - ie11 미지원. 
* moglog.es5(.min).js - ie11 지원. es5로 빌드됨.

ie10, ie9 는 확인되지 않음