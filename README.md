# githubuser-bookmark

GitHub 에서 제공하는 API를 사용하여 GitHub 유저를 검색하고 해당 유저를 북마크 하는 서비스

## 기능

- [x] 유저 리스트는 무한 스크롤 (infinite scroll) 형식으로 화면에 보여짐
- [x] 로딩 중인 경우에는 로딩 중임이 표시됨 (Loading Indicator)
- [x] 유저를 북마크 할 수 있음 (search bar 오른쪽에 노란색 bookmark text 선택시 북마크 페이지로 이동합니다)
    - [x] 북마크 된 유저를 모아서 볼 수 있음
- [x] 리스트에 표시되는 유저 정보 및 북마크 표시 나타남

- [x] 사용자는 username으로 사용자를 검색할 수 있음
- [x] username은 일부만 만족해도 검색 결과에 표시됨
    - [x] 예: 입력창에 kim 입력 시 “kim”, “kimmking”, “kiminh” 등이 표시됨
- [x] 무한 스크롤 (infinity scroll)은 20개의 데이터씩 화면에 표시됨
- [x] 유저 검색 결과가 존재하는 한 무한 스크롤이 수행됨
- [x] 유저 리스트를 클릭 시 북마크 또는 북마크 해제가 가능하며, 리스트에 북마크 상태가 표시됨
    - [x] 예: 북마크가 되어 있지 않을 경우 → 북마크 표시
    - [x] 북마크된 유저는 해제를 하지 않는 경우, 새로고침 시에도 계속 저장됨 (persist 미들웨어사용)
- [x] 북마크 된 유저 리스트를 모아서 볼 수 있음



## 사용 스킬
nextJs
zustand
react query


## Getting Started

메일로 첨부한 .env root에 넣어주십시오

```bash

npm i
npm run dev

```

