import React, {useState} from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { CHAT_PATH, MAIN_PATH, ROOM_DETAIL_PATH, ROOM_NUMBER_PATH_VARIABLE, ROOM_PATH } from '../../../constants';

interface Props {
    roomNumber?: number;
}

//                      component                       //
export default function ChatComePopUP({ roomNumber }: Props) {
//                      state                       //
// description : 네비게이터 //
const navigator = useNavigate();
// description : 채팅방 이름 상태 //
const [roomName, setRoomName] = useState<string>('Chat Room Come Come Come');
// description : 채팅방 비밀번호 상태 //
const [roomPassword, setRoomPassword] = useState<string>('');
// description : 채팅방 비밀번호 에러 상태 //
const [roomPasswordError, setRoomPasswordError] = useState<boolean>(false);

//                      function                       //
//                      event handler                       //
// description : 입장 버튼 클릭 이벤트 //
// todo : 입장버튼 클릭시 해당 채팅방으로 이동하게 구현해야함, 사용자 검증도 필요함//
const onComeClickHandler = () => {
    navigator(ROOM_PATH);
}
// description : 취소 버튼 클릭 이벤트 //
// todo : 취소버튼 클릭시 채팅방 리스트 화면으로 이동하게 다시 해야함 //
const onCancelClickHandler = () => {
    navigator(MAIN_PATH);
}

//                      component                       //
//                      effect                       //

//                      render                       //
  return (
    <div id='popup-wrapper'>
        <div className='popup-header'>
            <div className='popup-header-title'>Code Matchr</div>
        </div>
        <div className='popup-main'>
            <div className='popup-main-box'>
                <div className='popup-main-box-top'>
                    <div className='popup-main-top-title'>채팅방 입장</div>
                </div>
                <div className='popup-main-box-bottom'>
                    <div className='popup-main-bottom-room-name-box'>
                        <div className='popup-main-bottom-room-name'>방 이름</div>
                        <div className='popup-main-bottom-room-name-title'>{roomName}</div>
                    </div> 
                    <div className='popup-main-bottom-room-password-box'>
                        <div className='popup-main-bottom-room-password'>비밀번호</div>
                        <div className='popup-main-bottom-room-password-container'>
                            {roomPasswordError? (
                                <input className='popup-main-bottom-room-password-input-error'></input>
                                ) : (
                                <input className='popup-main-bottom-room-password-input'></input>
                            )}
                            {roomPasswordError ? (
                                <div className='popup-main-bottom-room-password-helper'>비밀번호가 올바르지않습니다. 다시 확인해주세요.</div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className='popup-main-bottom-button-box'>
                        <button className='popup-main-bottom-button-come' onClick={onComeClickHandler}>입장</button>
                        <button className='popup-main-bottom-button-cancel' onClick={onCancelClickHandler}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
