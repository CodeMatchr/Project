import React, { useEffect } from 'react';
import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Main from './views/Main';
import { AUTHENTICATION_PATH, BOARD_DETAIL_PATH, BOARD_DETAIL_TEST_PATH, BOARD_LIST_PATH, BOARD_NUMBER_PATH_VARIABLE, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, CHAT_PATH, COMPARE_PATH, MAIN_PATH, POPUP_BOARD_PATH, POPUP_COME_PATH, POPUP_MANAGER_BYE_PATH, POPUP_MANAGER_IMAGE_PATH, POPUP_MANAGER_NAME_PATH, POPUP_MANAGER_PASSWORD_PATH,  POPUP_PATH, POPUP_ROOM_PATH, ROOM_LIST_PATH, ROOM_NUMBER_PATH_VARIABLE, ROOM_PATH, USER_ITEM_PATH, USER_PAGE_PATH_VARIABLE, USER_PATH, WRITE_PATH } from './constants';
import { Route, Routes, useLocation } from 'react-router-dom';
import Authentication from './views/Authentication';
import BoardWrite from './views/Board/Write';
import BoardDetail from './views/Board/Detail';
import UserPage from './views/UserPage';
import Room from './views/Room';
import Chat from './views/Chat';
import { useCookies } from 'react-cookie';
import GetLoginUserResponseDto from './interfaces/response/User/get-login-user.response.dto';
import ResponseDto from './interfaces/response/response.dto';
import { useUserStore } from './store';
import { getSignInUserRequest } from './apis';
import BoardList from './views/Board/List';


function App() {
// state //
// 현재페이지 url 상태 //
const {pathname} = useLocation();
// 유저 스토어 상태 //
const {user, setUser} = useUserStore();

// Cookies 상태 //
const [cookies, setCookie] = useCookies();

// function //
// 로그인 사용자 //
const getSignInUserResponseHandler = (result : GetLoginUserResponseDto | ResponseDto) => {
  const {code} = result;

  if(code === 'NE') alert('존재하지 않는 사용자 이메일입니다.');
  if(code === 'DE') alert('데이터 베이스 오류입니다.');
  if(code !== 'SU') return;

  setUser(result as GetLoginUserResponseDto);
  
  console.log("app 로그인부분" + result);
  console.log("app 로그인부분" + user);
  console.log("app 로그인부분" + user?.userEmail);  
}

// effect //
// 로그인 사용자 //
useEffect(() => {
  const accessToken = cookies.accessToken;
  if(!user && accessToken) 
  getSignInUserRequest(accessToken).then(getSignInUserResponseHandler);
}, [pathname]);

  return (
    <>
      <Header/>

      <Routes>

        {/* 메인화면 MAIN */}
        <Route path={MAIN_PATH} element={<Main/>} />

        {/* 로그인 / 회원가입 화면 AUTHENTICATION */}
        <Route path={AUTHENTICATION_PATH} element={<Authentication/>} />

        {/* 유저 화면(마이페이지) USER */}
        <Route path={USER_PATH(USER_PAGE_PATH_VARIABLE)} element={<UserPage/>} />

        {/* 게시글 관련 화면 BOARD */}
        <Route path={BOARD_LIST_PATH} element={<BoardList/>} />
        <Route path={BOARD_UPDATE_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<BoardDetail/>} />
        <Route path={BOARD_DETAIL_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<BoardDetail/>} />
        <Route path={WRITE_PATH} element={<BoardWrite/>} />

        {/* 다인원 채팅방 화면 ROOM */}
        <Route path={ROOM_PATH} element={<Room/>} />

        {/* 비교 분석 결과 화면 COMPARE */}
        <Route path={COMPARE_PATH} />

        {/* 채팅방 화면 CHAT */}
        <Route path={CHAT_PATH} element={<Chat/>} />

        {/* 팝업창 PopUp */}
        {/* <Route path={POPUP_ROOM_PATH} element={<ChatRoomPopUp/>} />
        <Route path={POPUP_COME_PATH} element={<ChatComePopUP/>} />
        <Route path={POPUP_MANAGER_NAME_PATH} element={<ChatManagerNamePopUp/>} />
        <Route path={POPUP_MANAGER_PASSWORD_PATH} element={<ChatManagerPasswordPopUp/>} />
        <Route path={POPUP_MANAGER_IMAGE_PATH} element={<ChatManagerImagePopUp/>} />
        <Route path={POPUP_MANAGER_BYE_PATH} element={<ChatManagerByePopUp/>} /> */}

      </Routes>
      <Footer/>
    </>
  );
}

export default App;