# Development Notes

가끔식 해줄 일
- `npm update` : 의존성 업데이트 및 `package-lock.json` 갱신.



<br><br>

## Setup
```shell
# git clone
git clone git@github.com:exizt/moglog.git

# node_modules created and TypeScript environment configured.
npm install
```



<br><br>

## Build
- `npm run build` : tsc + webpack
    - `npm run tsc` : ts -> js, d.ts
    - `npm run webpack` : ts -> mix.js (css 포함)
    - `npm run dist.css` : copy css to `/dist`
- `npm run webpack.dev` : ts -> mix.js (dev 모드)



<br><br>

## Versioning
- rules: `{major}.{minor}.{build}`
    - `major` : Major changes. No compatibility with previous versions at all.
    - `minor` : Minor code changes.
    - `build` : Updates or builds due to changes in dependencies, environment modifications, or cumulative counting. Just cumulative counting.


버전 변경 시 같이 작업할 사항
- `package.json`에서 버전 변경



<br><br>

## Project creation log
### Dependencies configuration
```shell
npm install --save-dev typescript
npm install --save-dev webpack webpack-cli ts-loader
npm install --save-dev style-loader css-loader
npm install --save-dev shx
```
- `typescript` : 타입스크립트 기능
- `webpack`, `webpack-cli` : 웹팩 및 웹팩 cli
- `ts-loader` : 웹팩에서 typescript를 로드하는 웹팩 로더
- `style-loader`, `css-loader` : css파일을 병합하기 위한 웹팩 로더
- `shx` : 파일 복사, 파일 삭제 등을 크로스플랫폼으로 스크립트 가능하게 해주는 기능


### config files
1. `tsconfig.json` : `npx tsc --init` 또는 파일을 복사해옴
2. `webpack.config.js` 복사 후 설정.


<br><br>

# ToDo
- 여러 곳에 동시에 생성하는 방식의 구현 고민 중.. `toc` 옵션을 받고, `contents`옵션이 없을 경우에, `toc`이 여러개의 개체를 가질 경우에 동작하게 하거나, `multiple`같은 옵션을 별도로 받거나 해서 구현해야할 듯..



<br><br>

# Release notes
3.1.x (2022-08)
- options 명칭 변경
    - `options.tocIn` -> `options.position`
- babel 제거 및 ie11 코드 제거, es5 지원 제거


2.0.3 (2021-06)
- typescript 로 전환
- options 명칭 변경
    - `target` -> `toc`
    - `prependHtml` -> `header`
    - `targetIn` -> toc + tocIn "end"
    - `tocClassName` -> `tocClass`
    - `anchorNamePrefix` -> `linkPrefix`


1.0.4 (2019-12)
- transpiling 을 위한 webpack, babel 도입


1.0.0 (2019-12-19)
- first commit