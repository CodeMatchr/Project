import React, { ChangeEvent, useRef, useState } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_WRITE_PATH } from '../../constants';
import BoardListResponseDto from '../../interfaces/response/board/board-list.response.dto';
import UserBoardItem from '../../components/UserBoardItem';
import { top3ViewBoardListMock } from '../../mocks';

//            component           //
// description : 마이페이지 컴포넌트 //
export default function UserPage() {
//            state           //
// description : 네비게이터 //
const navigator = useNavigate();
// description : 유저 이메일 상태 //
const { userEmail } = useParams();
// description : 유저페이지 여부 상태 //
const [userPage, setUserPage] = useState<boolean>(false);

//            function           //
//            event handler           //

  //            component           //
  // description : 마이페이지 상단(유저 정보) //
  // todo : 유저 이메일 상태에 따라 변경되는 부분 확인해서 추가, 수정해야함 //
  const UserPageTop = () => {
    //            state           //
    // description: 인풋 요소 상태 //
    const fileInputRef = useRef<HTMLInputElement>(null);

    // description : 프로필 이미지 상태 //
    const [profileImageUrl, setProfileImageUrl] = useState<string>('');
    // description : 이메일 상태 //
    const [email, setEmail] = useState<string>('email@email.com');
    // description : 닉네임 상태 //
    const [nickname, setNickname] = useState<string>('nickname');
    // description : 닉네임 변경 버튼 상태 //
    const [nicknameChange, setNicknameChange] = useState<boolean>(false);
    // description : 상태메세지 상태 //
    const [message, setMessage] = useState<string>('state message');
    // description : 상태메시지 변경 버튼 상태 //
    const [messageChange, setMessageChange] = useState<boolean>(false);

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
      setNicknameChange(nicknameChange);
    }
    // description : 글쓰기 버튼 클릭 이벤트 //
    const onWriteClickHandler = () => {
      navigator(BOARD_WRITE_PATH);
    }
    // description : 상태메세지 변경 이벤트 //
    const onMessageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    }
    // description : 상태메세지 변경 이벤트 //
    const onMessageClickHandler = () => {
      setMessage(message);
      setMessageChange(messageChange);
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
              <div className='userpage-user-nickname-button' onClick={onNicknameClickHandler}>
                <div className='userpage-user-nickname-icon'></div>
              </div>
            </div>
            <div className='userpage-user-email'>{email}</div>
          </div>
          <div className='userpage-user-message-box'>
            {messageChange ? (
              <input className='userpage-user-message-text-input' type='text' value={message} onChange={onMessageChangeHandler} size={message.length} ></input>
            ) : (
              <div className='userpage-user-message-text'>{message}</div>
            )}
            <div className='userpage-user-message-button' onClick={onMessageClickHandler}>
              <div className='userpafe-user-message-icon'></div>
            </div>
          </div>
        </div>
        <div className='userpage-button-box'>
          <div className='userpage-button-text-box'>
            <button className='userpage-button-text' onClick={onWriteClickHandler}>글쓰기</button>
          </div>
        </div>
      </div>
    );
  }
  
  //            component           //
  // description : 마이페이지 내 게시물 //
  const UserPageBoard = () => {
    //            state           //
    // description: 현재 페이지에서 보여줄 게시물 리스트 상태 //
    const [pageBoardList, setPageBoardList] = useState<BoardListResponseDto[]>(top3ViewBoardListMock);
    
    //            function           //
    //            event handler           //
    //            component           //
    //            effect           //
    
    //            render           //
    return (
      <div className='userpage-board-wrapper'>
        <div className='userpage-board-title'>내 게시물</div>
        <div className='userpage-board-contents-list'>
          {pageBoardList.map((item) => (<UserBoardItem item={item} />))}
        </div>
        <div className='divider'></div>
        <div className='userpage-board-pagination'></div>
      </div>
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
      <div className='userpage-code-wrapper'></div>
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
      <div className='userpage-chat-wrapper'></div>
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
