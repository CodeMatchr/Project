import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes, useLocation } from 'react-router-dom';

import { getSignInUserRequest } from './apis';
import ChatComePopUP from './components/PopUp/ChatComePopUp';
import { AUTHENTICATION_PATH, BOARD_DETAIL_PATH, BOARD_LIST_PATH, BOARD_NUMBER_PATH_VARIABLE, BOARD_UPDATE_PATH, COMPARE_PATH, MAIN_PATH, ROOM_DETAIL_PATH, ROOM_NUMBER_PATH_VARIABLE, ROOM_PATH, SEARCH_PATH, SEARCH_WORD_PATH_VARIABLE, USER_PAGE_PATH_VARIABLE, USER_PATH, WRITE_PATH } from './constants';
import { useUserStore } from './store';
import usePathStore from './store/path.store';
import useRoomChatStore from './store/roomChat.store';
import GetLoginUserResponseDto from './interfaces/response/User/get-login-user.response.dto';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import ResponseDto from './interfaces/response/response.dto';
import Authentication from './views/Authentication';
import BoardWrite from './views/Board/Write';
import BoardDetail from './views/Board/Detail';
import UserPage from './views/UserPage';
import Room from './views/Room';
import Chat from './views/Chat';
import BoardList from './views/Board/List';
import BoardUpdate from './views/Board/Update';
import SearchList from './views/Board/Search';
import Main from './views/Main';

import './App.css';


function App() {

// 현재페이지 url 상태 //
const {pathname} = useLocation();
// 유저 스토어 상태 //
const {user, setUser} = useUserStore();
// Cookies 상태 //
const [cookies, setCookie] = useCookies();

const { roomChat } = useRoomChatStore();

// nestJS //
const { path } = usePathStore();


// 로그인 사용자 //
const getSignInUserResponseHandler = (result : GetLoginUserResponseDto | ResponseDto) => {
  const {code} = result;

  if(code === 'NE') alert('존재하지 않는 사용자 이메일입니다.');
  if(code === 'DE') alert('데이터 베이스 오류입니다.');
  if(code !== 'SU') return;

  setUser(result as GetLoginUserResponseDto);
  
}

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
        <Route path={BOARD_UPDATE_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<BoardUpdate/>} />
        <Route path={BOARD_DETAIL_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<BoardDetail/>} />
        <Route path={WRITE_PATH} element={<BoardWrite/>} />
        

        {/* 다인원 채팅방 화면 ROOM */}
        <Route path={ROOM_PATH} element={<Room/>} />

        {/* 비교 분석 결과 화면 COMPARE */}
        <Route path={COMPARE_PATH} />

        {/* 다인원 채팅방 화면 CHAT */}
        <Route path={ROOM_DETAIL_PATH(ROOM_NUMBER_PATH_VARIABLE)} element={<Chat/>} />
        {/* 검색 화면 SEARCH */}
        <Route path={SEARCH_PATH(SEARCH_WORD_PATH_VARIABLE)} element={<SearchList />} />

        {/* nestJS */}
        {
        path === '/enter' ? (<ChatComePopUP selectRoomNumber={roomChat} />) :
        path === '/room' ? (<Chat/>) :
        (<></>)
      }

      </Routes>
      <Footer/>
    </>
  );
}

export default App;