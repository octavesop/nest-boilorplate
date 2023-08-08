## Description

Nest.js 개발 환경을 위한 보일러 플레이트 환경입니다.

### TODO
1. configService 및 env 연결 <= OS 환경변수 읽는 옵션 함께 제공
2. JOI 기반의 env validation
3. ~~class-validator 세팅~~
4. logger <= winston 할까말까... <= sentry 고려?
5. ~~swagger~~
6. ADMINJS
7. 자주 사용하는 의존성 docker 파일 제공
8. eb 배포 환경 + git action + dockerfile 함께 첨부 <= 주석으로 설명 표기
9. 에러 처리하는 global filter 작업
9. Nestia 적용 => 리서치 필요
10. ~~JWT 기반의 AuthGuard + JwtStrategy~~
11. ~~자주 쓰는 util? date나 hash 정도는 작업할 수도...~~
12. ~~그 외 오토포맷이나 lint 등의 작업 제공~~
13. 자주 사용할 가능성이 있는 모듈은 loader 디렉토리에 담아 제공할 것(지금은 레디스 아니면 aws 정도...)
14. 마이그레이션? => 근데 typeorm migration은 좋다고 생각 안 해서 나도...
15. axios




## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

