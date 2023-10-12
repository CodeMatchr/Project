import React, { useRef } from 'react'
import './style.css';

//            component           //
// description : 마이페이지 컴포넌트 //
export default function UserPage() {
//            state           //
//            function           //
//            event handler           //
  //            component           //
  // description : 마이페이지 상단(유저 정보) //
  const UserPageTop = () => {
    //            state           //
    // description: 인풋 요소 상태 //
    const fileInputRef = useRef<HTMLInputElement>(null);

    //            function           //
    //            event handler           //
    // description: 프로필 이미지 클릭시 파일 인풋창 열림 이벤트 //
    const onProfileClickHandler = () => {
      fileInputRef.current?.click();
    }
    
    
    //            component           //
    //            effect           //
    
    //            render           //
    return (
      <div className='userpage-top-wrapper'>
        <div className='userpage-profile-box'>
          <div className='userpage-profile-image' onClick={onProfileClickHandler}>
            <input type='file' style={{display: 'none'}} ref={fileInputRef} accept='image/*'/>
          </div>
        </div>
        <div className='userpage-user-info-box'>
          <div className='userpage-user-nickname-box'>
            <div className='userpage-user-nickname'>아이디</div>
            <div className='userpage-user-email'>email@email.com</div>
          </div>
          <div className='userpage-user-message-box'>
            <div className='userpage-user-message-text'>상태메세지</div>
          </div>
        </div>
        <div className='userpage-button-box'>
          <div className='userpage-button-text-box'>
            <button className='userpage-button-text'>글쓰기</button>
          </div>
        </div>
      </div>
    );
  }
  
  //            component           //
  // description : 마이페이지 내 게시물 //
  const UserPageBoard = () => {
    //            state           //
    //            function           //
    //            event handler           //
    //            component           //
    //            effect           //
    
    //            render           //
    return (
      <div></div>
    );
  } 

  //            component           //
  // description : 마이페이지 코드 비교 로그 //
  const UserPageCodeLog = () => {
    //            state           //
    //            function           //
    //            event handler           //
    //            component           //
    //            effect           //
    
    //            render           //
    return (
      <div></div>
    );
  } 

  //            component           //
  // description : 마이페이지 채팅방 //
  const UserPageChat = () => {
    //            state           //
    //            function           //
    //            event handler           //
    //            component           //
    //            effect           //

    //            render           //
    return (
      <div></div>
    );
  } 
//            effect           //
//            render           //
  return (
    <div id='userpage-wrapper'>
      <div className='userpage-wrapper-box'>
        <UserPageTop/>
        <UserPageBoard/>
        <UserPageCodeLog/>
        <UserPageChat/>
      </div>
    </div>
  )
}
