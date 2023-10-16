import React from 'react';
import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Main from './views/Main';
import { AUTHENTICATION_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, CHAT_PATH, COMPARE_PATH, MAIN_PATH, POPUP_COME_PATH, POPUP_MANAGER_PATH, POPUP_PATH, POPUP_ROOM_PATH, ROOM_PATH, USER_ITEM_PATH, USER_PATH } from './constants';
import { Route, Routes } from 'react-router-dom';
import Authentication from './views/Authentication';
import PopUp from './components/PopUp/ChatRoomPopUp';
import BoardWrite from './views/Board/Write';
import BoardDetail from './views/Board/Detail';
import ChatRoomPopUp from './components/PopUp/ChatRoomPopUp';
import ChatManagerPopUp from './components/PopUp/ChatManagerPopUp';
import UserPage from './views/UserPage';
import BoardUpdate from './views/Board/Update';
import ChatComePopUP from './components/PopUp/ChatComePopUp';
import UserBoardItem from './components/UserBoardItem';
import Room from './views/Room';
import Chat from './views/Chat';

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
        <Route path={BOARD_DETAIL_PATH} element={<BoardDetail/>} />
        <Route path={BOARD_WRITE_PATH} element={<BoardWrite/>} />
        <Route path={BOARD_UPDATE_PATH} element={<BoardUpdate/>} />

        {/* 다인원 채팅방 리스트 화면 ROOM */}
        <Route path={ROOM_PATH} element={<Room/>} />

        {/* 채팅방 입장 시 화면 Chat */}
        <Route path={CHAT_PATH} element={<Chat/>} />

        {/* 비교 분석 결과 화면 COMPARE */}
        <Route path={COMPARE_PATH} />

        {/* 팝업창 PopUp */}
        <Route path={POPUP_ROOM_PATH} element={<ChatRoomPopUp/>} />
        <Route path={POPUP_COME_PATH} element={<ChatComePopUP/>} />
        {/* <Route path={POPUP_MANAGER_PATH} element={<ChatManagerPopUp/>} /> */}

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
