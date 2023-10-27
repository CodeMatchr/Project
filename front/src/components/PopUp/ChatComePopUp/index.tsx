import React, {ChangeEvent, useEffect, useRef, useState, KeyboardEvent} from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { AUTHENTICATION_PATH, CHAT_PATH, MAIN_PATH, ROOM_DETAIL_PATH, ROOM_NUMBER_PATH_VARIABLE, ROOM_PATH } from '../../../constants';
import { useRoomStore } from 'src/store';
import { useCookies } from 'react-cookie';
import PatchRoomEntranceRequestDto from 'src/interfaces/request/room/patch-room-entrance-request.dto';
import { PatchRoomEntranceRequest, getRoomRequest, postRoomRequest } from 'src/apis';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import usePathStore from 'src/store/path.store';
import useRoomChatStore from 'src/store/roomChat.store';

interface Props {
    selectRoomNumber : string;
}

//                      component                       //
export default function ChatComePopUP({ selectRoomNumber }: Props) {
//                      state                       //
// description : 네비게이터 //
const navigator = useNavigate();
// description : 채팅방 비밀번호 상태 //
const [roomPasswordInput, setPasswordInput] = useState<string>(''); 
// description : 채팅방 비밀번호 에러 상태 //
const [roomPasswordError, setRoomPasswordError] = useState<boolean>(false);

// 채팅방 정보를 저장할 상태 //
const { roomNumber, roomTitle, roomPassword, setRoomTitle, setRoomPassword, resetRoom } = useRoomStore();
const [cookies, setCookie] = useCookies();
// 채팅방 상태 //
const [room, setRoom] = useState<GetRoomResponseDto | null>(null);
const [roomNumberFlag, setRoomNumberFlag] = useState<boolean>(true);

// 입장 버튼 Ref 상태 //
const entranceButtonRef = useRef<HTMLDivElement | null>(null);




// nestJS //
// path 상태 변경 //
const { setPath } = usePathStore();
// room 상태 변경 //
const { roomChat, setRoomChat } = useRoomChatStore();
// event handler : room 값 변경 처리 //
const onRoomValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const roomChat = event.target.value;
    setRoomChat(roomChat);
  }

//                      function                       //
// Room detail(채팅방) 불러오기 응답처리 함수 //
const getRoomResponseHandler = (responseBody : GetRoomResponseDto | ResponseDto) => {
    const { code } = responseBody;
    if (code == 'NR') alert('존재하는 않는 다인원 채팅방 번호입니다.');
    if (code == 'NE') alert('존재하지 않는 사용자 이메일입니다.');
    if (code !== 'SU') {
      navigator(MAIN_PATH);
      return;
    }

    const room = responseBody as GetRoomResponseDto;
    setRoom(room);
    setRoomTitle(room.roomTitle);
  }

// Room 입장 함수 //
const patchRoomEntranceResponseHandler = (code : string) => {
    if (code == 'NE') alert('존재하지 않는 사용자 이메일입니다.');
    if (code == 'AF') {
        alert('로그인이 필요합니다.');
        navigator(AUTHENTICATION_PATH);
        return;
    } 
    if (code == 'NR') alert('존재하는 않는 다인원 채팅방 번호입니다.');
    if (code == 'NCP') alert('비밀번호가 알맞지 않습니다.');
    if (code == 'SU' || code == 'EE') {
        navigator(ROOM_DETAIL_PATH(selectRoomNumber));
        return;
    }
    if (code != 'SU') {
        console.log(selectRoomNumber);
        navigator(MAIN_PATH);
        return;
    }
}
// Room password 변경 이벤트 //
const onPasswordChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
}

//                      event handler                       //
// description : 입장 버튼 클릭 이벤트 //
// todo : 입장버튼 클릭시 해당 채팅방으로 이동하게 구현해야함, 사용자 검증도 필요함//
const onComeClickHandler = async () => {
    const token = cookies.accessToken;

    const data : PatchRoomEntranceRequestDto = {
        roomPassword : roomPasswordInput
    }
    PatchRoomEntranceRequest(selectRoomNumber, data, token).then(patchRoomEntranceResponseHandler);

    // nestJS //
    if(!roomChat) return;
    setPath('/room');
}
// description : 취소 버튼 클릭 이벤트 //
// todo : 취소버튼 클릭시 채팅방 리스트 화면으로 이동하게 다시 해야함 //
const onCancelClickHandler = () => {
    navigator(MAIN_PATH);
}

// Enter Key 누름 처리 //
const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!entranceButtonRef.current) return;
    entranceButtonRef.current.click();
  }

//                      effect                       //
// let roomNumberFlag = true;
useEffect(() => {
  if(roomNumberFlag) {
    setRoomNumberFlag(false);
    return;
  }
  if(!selectRoomNumber) {
    alert('채팅방 번호가 잘못되었습니다.');
    navigator(MAIN_PATH);
    return;
  }
  const accessToken = cookies.accessToken;
  getRoomRequest(selectRoomNumber, accessToken).then(getRoomResponseHandler);
}, [selectRoomNumber, roomNumberFlag]);



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
                        <div className='popup-main-bottom-room-name-title'>{roomTitle}</div>
                    </div> 
                    <div className='popup-main-bottom-room-password-box'>
                        <div className='popup-main-bottom-room-password'>비밀번호</div>
                        <div className='popup-main-bottom-room-password-container'>
                            {roomPasswordError? (
                                <input className='popup-main-bottom-room-password-input-error' onChange={onPasswordChangeHandler} onKeyDown={onEnterKeyDownHandler}></input>
                                ) : (
                                <input className='popup-main-bottom-room-password-input' onChange={onPasswordChangeHandler} onKeyDown={onEnterKeyDownHandler}></input>
                            )}
                            {roomPasswordError ? (
                                <div className='popup-main-bottom-room-password-helper'>비밀번호가 올바르지않습니다. 다시 확인해주세요.</div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className='popup-main-bottom-button-box'>
                        <div className='popup-main-bottom-button-come' onClick={onComeClickHandler} ref={entranceButtonRef}>입장</div>
                        <div className='popup-main-bottom-button-cancel' onClick={onCancelClickHandler}>취소</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
