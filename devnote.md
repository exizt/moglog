# 개발 관련 노트

가끔식 해줄 일
* `npm update`


# 빌드
esnext 버전
* `npm run build` : tsc + minify
  * `npm run tsc` : ts -> js
  * `npm run minify` : js -> min.js


es5 버전 (support ie11)
* `npm run build.legacy` : tsc (es5.js) + minify (es5.min.js)
  * `npm run tsc.legacy` : ts -> es5.js
  * `npm run minify.legacy` : es5.js -> es5.min.js


# 버저닝
1. major : 대대적 변경.
2. minor : ts 코드에 사소한 변경.
3. build : 의존성 변경, 환경 변경으로 인한 업데이트. 또는 빌드.



버전 변경 시 같이 작업할 사항
1. package.json 에서 버전 변경
2. ts 코드 상단에서 버전 변경


# 프로젝트 구성 과정에서의 히스토리
## npm 셋팅
```console
$ npm install --save-dev typescript
$ npm install --save-dev webpack webpack-cli ts-loader
$ npm install --save-dev style-loader css-loader
$ npm install --save-dev shx
```
- `typescript` : 타입스크립트 기능
- `webpack`, `webpack-cli` : 웹팩 및 웹팩 cli
- `ts-loader` : 웹팩에서 typescript를 로드하는 웹팩 로더
- `style-loader`, `css-loader` : css파일을 병합하기 위한 웹팩 로더
- `shx` : 파일 복사, 파일 삭제 등을 크로스플랫폼으로 스크립트 가능하게 해주는 기능

## 설정 파일
1. `tsconfig.json`설정. 
    - `npx tsc --init` 또는 파일을 복사해옴
2. `webpack.config.js` 복사 후 설정.




# release note
작업중
- options 명칭 변경
  * contents -> context
  * toc -> out
  * 


2.0.3
- typescript 로 전환
- options 명칭 변경
  * target -> toc
  * prependHtml -> header
  * targetIn -> toc + tocIn "end"
  * tocClassName -> tocClass
  * debug -> isDebug
  * anchorNamePrefix -> linkPrefix



1.0.4
- transpiling 을 위한 webpack, babel 도입


1.0.0 (2019-12-19)
- first