# 개발 관련 노트

가끔식 해줄 일
- `npm update` : 의존성 업데이트 및 `package-lock.json` 갱신.



<br><br>

# 빌드
- `npm run build` : tsc + webpack
  - `npm run tsc` : moglog.ts -> moglog.js, moglog.d.ts
  - `npm run webpack` : moglog.ts -> moglog.mix.js (js+css)
- `npm run webpack.dev` : moglog.ts -> moglog.mix.js (js+css)(development mode)



<br><br>

# 버저닝 규칙
버저닝 규칙 (`'{major}.{minor}.{build}'`)
1. `major` : 큰 변경. 이전 버전과의 호환성이 아예 없음.
2. `minor` : ts 코드에 사소한 변경. 평범한 코드 변경.
3. `build` : (누적 카운팅) 의존성 변경, 환경 변경으로 인한 업데이트. 또는 빌드. 그냥 소소하게 누적 카운팅.


버전 변경 시 같이 작업할 사항
- `package.json`에서 버전 변경



<br><br>

# 프로젝트 셋팅
1. `npm install` : `node_modules` 생성 및 타입스크립트 환경 구성됨.



<br><br>

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



<br><br>

# release note
작업중 (2022-08)
- options 명칭 변경
  * `options.tocIn` -> `options.position`
- babel 제거 및 ie11 코드 제거, es5 지원 제거


2.0.3 (2021-06)
- typescript 로 전환
- options 명칭 변경
  * `target` -> `toc`
  * `prependHtml` -> `header`
  * `targetIn` -> toc + tocIn "end"
  * `tocClassName` -> `tocClass`
  * `anchorNamePrefix` -> `linkPrefix`


1.0.4 (2019-12)
- transpiling 을 위한 webpack, babel 도입


1.0.0 (2019-12-19)
- first commit