import React from 'react';
import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Main from './views/Main';
import { AUTHENTICATION_PATH, BOARD_PATH, COMPARE_PATH, MAIN_PATH, POPUP_MANAGER_PATH, POPUP_PATH, POPUP_ROOM_PATH, ROOM_PATH, USER_PATH } from './constants';
import { Route, Routes } from 'react-router-dom';
import Authentication from './views/Authentication';
import PopUp from './components/PopUp/ChatRoomPopUp';
import ChatRoomPopUp from './components/PopUp/ChatRoomPopUp';
import ChatManagerPopUp from './components/PopUp/ChatManagerPopUp';

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
        <Route path={USER_PATH} />

        {/* 게시글 관련 화면 BOARD */}
        <Route path={BOARD_PATH} />
        <Route path={BOARD_PATH} />
        <Route path={BOARD_PATH} />

        {/* 다인원 채팅방 화면 ROOM */}
        <Route path={ROOM_PATH} />

        {/* 비교 분석 결과 화면 COMPARE */}
        <Route path={COMPARE_PATH} />

        {/* 팝업창 PopUp */}
        <Route path={POPUP_ROOM_PATH} element={<ChatRoomPopUp/>} />
        <Route path={POPUP_MANAGER_PATH} element={<ChatManagerPopUp/>} />


      </Routes>
      
      <Footer/>
    </>
  );
}

export default App;
