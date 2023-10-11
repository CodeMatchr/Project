import React, { Dispatch, SetStateAction, useState, ChangeEvent } from 'react'
import './style.css'; 



//            component           //
// description : 채팅방 만들기 팝업창 // 
export default function PopUp() {
//            state           //
// description : 방 이름 상태 //
const [roomName, setRoomName] = useState<string>('');
// description : 방 비밀번호 상태 //
const [roomPassword, setPassword] = useState<string>('');
// description : 방 이름 에러 상태 //
const [roomNameError, setRoomNameError] = useState<boolean>(false);
// description : 방 비밀번호 에러 상태 //
const [roomPasswordError, setRoomPasswordError] = useState<boolean>(false);

//            function           //
//            event handler           //
// description : 방 이름 변경 이벤트 처리 함수 //
const onRoomNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const roomName = event.target.value;
  setRoomName(roomName);
}
// description : 방 비밀번호 변경 이벤트 처리 함수 //
const onRoomPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const roomPassword = event.target.value;
  setPassword(roomPassword);

}
//            component           //
//            effect           //
//            render           //
  return (
    <div id='popup-wrapper'>
      <div className='popup-header'>
        <div className='popup-header-title'>Code Matchr</div>
      </div>
      <div className='popup-main'>
        <div className='popup-main-box'>
          <div className='popup-main-box-top'>
            <div className='popup-main-top-title'>채팅방 만들기</div>
            <div className='popup-main-top-image-box'>
              <div className='popup-main-image-text'>채팅방 이미지 업로드</div>
              <div className='popup-main-image-button'></div>
            </div>
          </div>
          <div className='popup-main-box-bottom'>
            <div className='popup-main-bottom-room-name-box'>
              <div className='popup-main-bottom-room-name'>방 이름</div>
              {roomNameError ? 
              <input className='popup-main-bottom-room-name-input-error' type='text' placeholder='방 이름을 입력해주세요.' onChange={onRoomNameHandler}/>
              :
              <input className='popup-main-bottom-room-name-input' type='text' placeholder='방 이름을 입력해주세요.' onChange={onRoomNameHandler}/>
              }
            </div>
            <div className='popup-main-bottom-room-input-error-box'>
              {roomNameError ? 
              <div className='popup-main-bottom-room-input-name-error'>채팅방 이름을 입력하지 않았습니다. 다시 입력해주세요.</div>
              :
              <></>}
            </div>
            <div className='popup-main-bottom-room-password-box'>
              <div className='popup-main-bottom-room-password'>비밀번호</div>
              {roomPasswordError ? 
              <input className='popup-main-bottom-room-password-input-error' type='text' placeholder='방 비밀번호를 입력해주세요.' onChange={onRoomPasswordHandler} />
              :
              <input className='popup-main-bottom-room-password-input' type='text' placeholder='방 비밀번호를 입력해주세요.' onChange={onRoomPasswordHandler} />
              }
            </div>
            <div className='popup-main-bottom-room-input-error-box'>
              {roomPasswordError ? 
              <div className='popup-main-bottom-room-input-password-error'>비밀번호를 입력하지 않았습니다. 다시 입력해주세요.</div> 
              :
              <></>}
            </div>
            <div className='popup-main-bottom-button-box'>
              <button className='popup-main-bottom-button-create'>생성</button>
              <button className='popup-main-bottom-button-cancel'>취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )      
}
