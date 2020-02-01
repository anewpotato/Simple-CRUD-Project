# Simple-CRUD-Project
![mainPage](./images/mainPage.PNG)

## 목차
* 들어가며
  1. 프로젝트 소개  
    1-1. 프로젝트 기능   
    1-2. 개발 환경    
    1-3. 프로젝트 작동구조   
    1-4. 실행영상

* Front-End(React)
  1. 컴포넌트 구성
  2. 화면구성
* Back-End(Spring Framework)
  1. 사용기술
  2. DataBase 테이블 설계
  
## 들어가며
 #### 1. 프로젝트 소개
 
&nbsp;&nbsp;본 프로젝트를 시작하게 된 계기는 많은 분들이 이야기 하시는 웹 프로그래밍의 기본 소양이라 할 수 있는 기본적인 기능인 CRUD가 가능한 게시판을 목적으로 시작하게 된 프로젝트 입니다. 혼자 독학으로 관련 기술들을 학습한 이후 제작한 개인 프로젝트이기 때문에, 자신은 없지만 개인적인 만족감을 가지고 있는 프로젝트 입니다.
     
   #### 1-1. 프로젝트 기능
   
&nbsp;&nbsp;본 프로젝트의 초기에 구상한 기능은 가장 기본적인 기능인 CRUD 즉, 게시판에 올라오는 게시물을 대상으로 Create, Read, Update, Delete가 가능한 게시판이었습니다. 그러나 전부 완성되어 갈 때 쯤, 아쉬운 부분이 계속해서 생겨나서 몇몇 기능들을 추가하게 되었습니다. 아래가 그 내용입니다.
    
  * 초기 기능
    * 게시물을 작성하여 DataBase에 저장한다.
    * DataBase에서 게시물을 조회하여 웹 페이지 상에 표시한다.
    * 게시물을 수정하여 DataBase에 저장한다.
    * 게시물을 삭제할 시 DataBase에서 삭제한다.
    * SPA 구조에서 react-router를 이용한 라우팅 기능 제공.
    
  * 추가 기능
    * 웹 페이지 이용자를 2가지(Admin, Visitor)로 분류한다. 분류된 사용자들에게 제한된 기능을 제공한다.<br/>
     Admin - 게시판에 존재하는 게시물들에 대한 모든 기능에 접근 가능.<br/>
     Visitor - 게시판에 존재하는 게시물들에 대한 Read 기능 및 댓글 기능에 접근 가능.
    * Read 기능에서 페이징 처리를 통해 한 페이지 당 보여주는 게시물의 수를 10개로 제한
    * Read 기능에서 특정 게시물에 대한 댓글을 Create, Read, Update, Delete 가능하게 함.
    * Read 기능에서 특정 게시물을 제목으로 검색이 가능하게 함.<br/><br/>
    
   #### 1-2. 개발 환경
    
  &nbsp;&nbsp;운영 체제: window10<br/>
  &nbsp;&nbsp;IDE: Eclipse 4.12.0<br/>
  &nbsp;&nbsp;Back-end: Spring Framework 3.1.1.RELEASE, myBatis 3.2.8<br/>
  &nbsp;&nbsp;Front-end: React 16.12.0, React-bootstrap v1.0.0-beta 16<br/>
  &nbsp;&nbsp;Data Base: Oracle 11g Release 11.2.0.1.0<br/>
  &nbsp;&nbsp;Web Pack: 4.41.5<br/>
  &nbsp;&nbsp;Web browser: Chrome<br/>
    
   #### 1-3. 프로젝트 작동구조
    
   &nbsp;&nbsp; 서버 사이드 렌더링인 SSR방식이 아닌, 클라이언트 사이드 렌더링인 CSR방식을 이용해 SPA 구조로 개발을 하고자 노력했습니다. 프로젝트의 기본적인 작동 구조는 Back-end에서 Spring Framework을 이용해 한 개의 jsp파일만을 view로써 제공을 하게되는데, 해당 jsp 파일에 Front-end에서 React를 이용해 작업한 파일들을  Web Pack을 이용해 번들링하여 포함시켜 주었습니다.
   
   &nbsp;&nbsp;사용자가 정보를 필요로 하는 경우 서버와의 ajax 비동기 통신을 이용해 요청을 전달하고 서버는 myBatis를 이용해 mapper에 등록된 mapping interface에 해당하는 sql문을 이용해 Data Base에 접속하여 필요한 데이터를 추출하여 JSON형태로 전달하게 됩니다. 이 과정에서 Rest API를 적용하고자 노력하였으나, 해당 부분에 대한 이해가 미숙하여 일차적으로 HTTP Method인 GET, POST, PUT, DELETE만을 이용해 작성하였습니다.
   
   &nbsp;&nbsp; SPA구조가 가지는 문제점인 뒤로 가기, 앞으로 가기의 문제점은 React-Router를 이용해 React에서 특정 URL로 링크 시켜준 뒤 해당 링크와 일치하는 경우 특정 컴포넌트를 보여주는 방식으로 해결할 수 있었습니다.
   
   #### 1-4. 실행영상 
**아래의 이미지를 클릭해주세요.**

[![Video Label](http://img.youtube.com/vi/JgWCIUzCKHQ/0.jpg)](https://youtu.be/JgWCIUzCKHQ?t=0s) 

## Front-end(React)
 #### 1. 컴포넌트 구성

    




