# Code Matchr

# front
## 폴더
|폴더명|설명|
|--|--|
|apis|API 연결 시 사용하는 함수|
|assets|이미지 관련 요소 (JPG, JEPG ...)|
|components|최소 단위의 기능|
|constants|전역으로 사용되는 상수|
|hooks|상태관리|
|interface|전역으로 사용되는 타입|
|layouts|Header, Footer|
|mocks|임시 데이터|
|utils|전역으로 사용되는 함수|
|views|실제 화면에서 보여주는 단위|
<!-- |stores|상태관리 라이브러리| -->
# back
## 폴더
|폴더명|설명|
|--|--|
|common|공통되는 code, message|
|config|CORS|
|controller|Spring 레이어드 아키텍처에서 프레젠테이션 영역|
|dto|데이터 전송 객체|
|entity|DataBase Table 매핑 객체 (MySql)|
|exception|예외 처리|
|filter|보안 관리 및 제어|
|provider|보안 토큰 생성|
|repository|Spring 레이어드 아키텍처에서 데이터 접근 영역|
|service|Spring 레이어드 아키텍처에서 비즈니스 영역|

npm i -g @nestjs/cli

nest-back

nest new realtime-nest-back

------------------------------

npm i @nestjs/websockets @nestjs/platform-socket.io

npm i socket.io

nest g mo chat

nest g co chat

nest g pr chat

npm run start:dev

------------------------------

front

npm i axios sockjs-client @stomp/stompjs

npm i socket.io-client

npm i moment