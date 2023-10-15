import React from 'react';
import './style.css'; 

export default function ChatRoomList() {
  return (
    <div id='chatroom-wrapper'>
      <div className='chatroom-left-box'>
        <div className='chatroom-image-url'>채팅방 이미지</div>
      </div>
      <div className='chatroom-middle-box'>
        <div className='chatroom-middle-text'>채팅방 제목</div>
      </div>
      <div className='chatroom-right-box'>
        <div className='chatroom-people'>인원수</div>
        <div className='chatroom-profile-image'></div>
        <div className='chatroom-nickname'>방장</div>
      </div>
    </div>
  )
}
