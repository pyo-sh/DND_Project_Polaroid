# :two_men_holding_hands: DND 1기 3팀 Polaroid 의 Project

### &#127752; 서비스 기획내용

사진 판매 사이트
> 사진 및 일러스트 및 무료/유료 업로드, 다운로드를 할 수 있는 서비스

### :calendar: 기간 
2019-07-02 ~ 2019-09-28

### :earth_asia: 개발환경

* frontEnd

    <img src="./images/React.jpg" height = "150"/>

* backEnd
    - Express : Node.js 웹 애플리케이션 프레임워크
    - AWS RDS : MariaDB
    - AWS S3 : 온라인 스토리지 웹 서비스
    - AWS EC2 : Linux Server
    - DB Table : AWS(dapitaa) 아이디에 수동 스냅샷 생성(poloapp-lastBackups)으로 보관 중

* Communication
    - Trello
    - GitLab

### :computer: 배포

* 프론트 : https://dnd-project-polaroid.vercel.app/

### :ledger: 트렐로

https://trello.com/b/LUptvYWP/to-do-list

### 6주 완성도( 약 86% )

### :pencil: 후기

팀장인 건우형이 카카오톡에 올린 부산 IT 연합동아리 D&D에서 06/11 ~ 07//11에 서류접수를 한다는 포스터를 보고 학교 동아리인 DATAPIA의 나를 포함한 동아리원 5명과 함께 신청을 하게 되었다.

다른 동아리원은 모르겠지만 사실 나는 방학에 잠시 html과 css를 연습한것과 java 밖에 할 줄 아는게 없어서, 7월 11일 합격발표가 나기 전까지 아무런 기대도 없이 동아리원들과 함께 자바스크립트 기초와 Spring 공부를 준비하는 중이었다.

합격이 발표나고, 경성대 서브센터 부산콘텐츠코리아랩에서 모이기 전까지도 어떤 프로젝트를 할지, 어떤 언어를 사용해야 하는지 잘 모르고 있는 상태였다.
여러번의 토의 끝에 프론트는 건우형의 경험이 있는 React를 사용하게 되었다.

프로젝트 진행하기에 앞서 어떤 것을 만들것인지 기획, GitLab과 Trello 사용 등에 대한 규칙을 정하는 시간이 있었다.

YouTube의 노마드코더 채널을 통해 React 공부하는 것을 추천 받았고, VanillaJS로 구글의 자기 일정 관리 페이지 확장 기능인 Momentum과 ReactJS로 영화 랭킹 서비스를 제공하는 웹 페이지를 만들어보았다. 

나에게는 자바스크립트도 아직 익숙하지 않은 상태라서 React란 것이 이해하기 힘들었었다.

그래서인지 오랜시간 고민하며 만든 프로젝트에서 구현한 기능들은 지금 당장은 괜찮게 잘 돌아갔었지만, 나중에 프로젝트가 끝날 때 쯔음 내가 만든 코드들을 다시 보니 정말 미흡하게 만들었다는 생각이 들었었다.

라이프사이클도 전혀 고려되지 않았고, 아래 컴포넌트들에게 Props를 끝도없이 내려주고, 과도하게 class를 나누고 등등...

또한 팀원들과의 규칙을 정해놓지 않아서 나중에 모든 기능들을 합칠 때 각자의 코드들의 변수를 못 알아보고, css가 겹쳐서 다시 수정하고, 기능들이 추가되고 없어지고 하는 과정에서 만들어 놓은 와이어프레임이 없는 페이지까지 만들게 되면서 뒤죽박죽이 되어있었다.

다행스럽게도 점차 그 상황에 다들 익숙해져갔고, 마지막에 밤을 새워가면서 까지 보완을 하여서 각자의 역할을 잘 수행했었던 것 같다.

이번 프로젝트에서 다짐했던 내용들이 있다.
다음번에는 Trello 이용을 잘 할 것, 변수 명은 프로젝트 하는 팀원끼리 규칙을 정해서 만들 것, 시간 배분을 믿고 천천히 하는게 아니라 시간이 남는다면 조금 더 앞서 진행할 것.

Redux 또는 Mobx 의 필요성, React hooks, Aws 사용에 대해서 고려하는 것이다.

같이 프로젝트를 진행했던 팀원들과 열심히 해서 그런지, 추정 진행률이 86% 정도 나왔다.

처음엔 100%을 못해서 조마조마 했었지만, 다들 두달이란 시간에 100% 수행을 하진 못했던거 같다.

우리 팀이 진행률이 다른 팀보다 앞서갔다는 걸 보고나서, 엄청난 뿌듯함을 느꼈다.

다음 프로젝트에서는 좀 더 계획적으로, 완성도 높은 결과물을 만드는게 목표이다.

> 프로젝트 작업을 하는데 도움을 주신 멘토분들에게 감사드립니다!

### &#127760; UI

<img src="./images/Main.jpg" width="600"/>

----------------

<img src="./images/Login.jpg" width="600"/>

----------------

<img src="./images/Lists.jpg" width="600"/>

----------------

<img src="./images/Download.jpg" width="600"/>

----------------

<img src="./images/Search.jpg" width="600"/>

----------------

<img src="./images/Upload.jpg" width="600"/>

----------------

<img src="./images/Chart.jpg" width="600"/>

----------------

<img src="./images/Content.jpg" width="300"/>

----------------

<img src="./images/Follow.jpg" width="300"/>

----------------

<img src="./images/Ranking.PNG" width="300"/>

----------------

<img src="./images/Money.jpg" width="300"/>

----------------

### 구현되지 못한 기능들

* 관리자 페이지[ 등급 관리, 회원 관리, Q&A, 고객센터 등등 ]
* 연관 이미지
* 사진 별 수익에 대한 상세 정보
* 검색에 대한 상세 정보

### 기타 기억해야 할 내용

* Visual Studio Code를 이용하면 편하다.
    - Live Server 라는 부가기능을 설치하면 변경사항이 브라우저에 즉시 반영되는 것을 사용할 수 있다.
* DND_polaroid 파일과 frontend 파일 모두 npm install 이 필요하다.
    - npm install -g yarn 을 통해 yarn 설치, yarn --version 으로 설치 완료인지 확인한다.
* DND_polaroid 파일은 nodemon server, frontend 파일은 yarn start 가 필요하다. (nodemon, yarn 설치 필수)
    - 데이터 서버 설정이 필요하다 ! ( 사용 원할 시 AWS 스냅샷 이용 / 사진 관련 DB는 팀장 문건우의 아이디에 있다. )