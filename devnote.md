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