import React from 'react';
import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Main from './views/Main';
import { AUTHENTICATION_PATH, BOARD_DETAIL_PATH, BOARD_NUMBER_PATH_VARIABLE, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, CHAT_PATH, COMPARE_PATH, MAIN_PATH, POPUP_BOARD_PATH, POPUP_COME_PATH, POPUP_MANAGER_BYE_PATH, POPUP_MANAGER_IMAGE_PATH, POPUP_MANAGER_NAME_PATH, POPUP_MANAGER_PASSWORD_PATH,  POPUP_PATH, POPUP_ROOM_PATH, ROOM_LIST_PATH, ROOM_NUMBER_PATH_VARIABLE, ROOM_PATH, USER_ITEM_PATH, USER_PATH } from './constants';
import { Route, Routes } from 'react-router-dom';
import Authentication from './views/Authentication';
import BoardWrite from './views/Board/Write';
import BoardDetail from './views/Board/Detail';
import ChatRoomPopUp from './components/PopUp/ChatRoomPopUp';
import UserPage from './views/UserPage';
import ChatComePopUP from './components/PopUp/ChatComePopUp';
import Room from './views/Room';
import Chat from './views/Chat';
import ChatManagerNamePopUp from './components/PopUp/ChatManagerNamePopUp';
import ChatManagerPasswordPopUp from './components/PopUp/ChatManagerPasswordPopUp';
import ChatManagerImagePopUp from './components/PopUp/ChatManagerImagePopUp';
import ChatManagerByePopUp from './components/PopUp/ChatManagerByePopUp';

function App() {
  return (
    <>
      <Header/>

      <Routes>

        {/* 메인화면 MAIN */}
        <Route path={MAIN_PATH} element={<Main/>} />

        {/* 로그인 / 회원가입 화면 AUTHENTICATION */}
        <Route path={AUTHENTICATION_PATH} element={<Authentication/>} />

        {/* 유저 화면(마이페이지) USER */}
        <Route path={USER_PATH} element={<UserPage/>} />

        {/* 게시글 관련 화면 BOARD */}
        <Route path={BOARD_PATH} element={<BoardDetail/>} />
        <Route path={BOARD_DETAIL_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<BoardDetail/>} />
        <Route path={BOARD_WRITE_PATH} element={<BoardWrite/>} />

        {/* 다인원 채팅방 화면 ROOM */}
        <Route path={ROOM_PATH} element={<Room/>} />

        {/* 비교 분석 결과 화면 COMPARE */}
        <Route path={COMPARE_PATH} />

        {/* 채팅방 화면 CHAT */}
        <Route path={CHAT_PATH} element={<Chat/>} />

        {/* 팝업창 PopUp */}
        <Route path={POPUP_ROOM_PATH} element={<ChatRoomPopUp/>} />
        <Route path={POPUP_COME_PATH} element={<ChatComePopUP/>} />
        <Route path={POPUP_MANAGER_NAME_PATH} element={<ChatManagerNamePopUp/>} />
        <Route path={POPUP_MANAGER_PASSWORD_PATH} element={<ChatManagerPasswordPopUp/>} />
        <Route path={POPUP_MANAGER_IMAGE_PATH} element={<ChatManagerImagePopUp/>} />
        <Route path={POPUP_MANAGER_BYE_PATH} element={<ChatManagerByePopUp/>} />

      </Routes>
      <Footer/>
    </>
  );
}

export default App;