import React from 'react';
import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Main from './views/Main';
import { AUTHENTICATION_PATH, BOARD_PATH, COMPARE_PATH, MAIN_PATH, POPUP_PATH, ROOM_PATH, USER_PATH } from './constants';
import { Route, Routes } from 'react-router-dom';
import Authentication from './views/Authentication';
import PopUp from './components/PopUp/ChatRoomPopUp';
import BoardWrite from './views/Board/Write';
import BoardDetail from './views/Board/Detail';

function App() {
  return (
    <>
      <Header/>

      
      
      <BoardDetail/>
    </>
  );
}

export default App;
