import React, { ChangeEvent, useRef, useState } from 'react'
import './style.css';
import { useParams } from 'react-router-dom';

//            component           //
// description : 마이페이지 컴포넌트 //
export default function UserPage() {
//            state           //
// description : 유저 이메일 상태 //
const { userEmail } = useParams();

//            function           //
//            event handler           //

  //            component           //
  // description : 마이페이지 상단(유저 정보) //
  const UserPageTop = () => {
    //            state           //
    // description: 인풋 요소 상태 //
    const fileInputRef = useRef<HTMLInputElement>(null);
    // description : 유저 프로필 이미지 상태 //
    const [profileImageUrl, setProfileImageUrl] = useState<string>('');
    // description : 유저 닉네임 상태 //
    const [nickname, setNickname] = useState<string>('nickname');
    // description : 닉네임 변경 버튼 상태 //
    const [nicknameChange, setNicknameChange] = useState<boolean>(true);

    //            function           //
    //            event handler           //
    // description: 프로필 이미지 클릭시 파일 인풋창 열림 이벤트 //
    const onProfileClickHandler = () => {
      fileInputRef.current?.click();
    }
    // description : 닉네임 변경 이벤트 //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setNickname(event.target.value);
    }
    // description : 닉네임 변경 버튼 클릭 이벤트 //
    const onNicknameClickHandler = () => {
      setNickname(nickname);
      setNicknameChange(!nicknameChange);
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
            <div className='userpage-user-nickname-input-box'>
              {nicknameChange ? (
                <input className='userpage-user-nickname-input' type='text' value={nickname} onChange={onNicknameChangeHandler} size={nickname.length}/>
              ) : (
                <div className='userpage-user-nickname'>{nickname}</div>
              )}
              <div className='userpage-user-nickname-button'></div>
            </div>
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
