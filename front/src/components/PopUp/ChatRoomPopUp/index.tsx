import React, { useState, ChangeEvent, useRef, useEffect, KeyboardEvent } from 'react'
import { useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRoomStore, useUserStore } from 'src/store';
import { getRoomRequest, postRoomRequest, uploadFileRequest } from 'src/apis';
import { AUTHENTICATION_PATH, MAIN_PATH, ROOM_DETAIL_PATH } from '../../../constants';
import PostRoomRequestDto from 'src/interfaces/request/room/post-room.request.dto';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import PostRoomResponseDto from 'src/interfaces/response/room/post-room.response.dto';
import './style.css'; 

// 채팅방 만들기 팝업창 // 
export default function ChatRoomPopUp() {


const navigator = useNavigate();


// 방 이름 상태 //
const [roomName, setRoomName] = useState<string>('');
// 방 비밀번호 상태 //
const [roomPasswordInput, setPasswordInput] = useState<string>('');
// 방 이름 에러 상태 //
const [roomNameError, setRoomNameError] = useState<boolean>(false);
// 방 비밀번호 에러 상태 //
const [roomPasswordError, setRoomPasswordError] = useState<boolean>(false);

// 파일 업로드 버튼 요소에 대한 참조 상태 //
const fileInputRef = useRef<HTMLInputElement>(null);

const [cookies] = useCookies();


// 로그인 사용자 정보 상태 //
const { user, setUser } = useUserStore();
// 채팅방 정보를 저장할 상태 //
const { roomNumber, roomTitle, roomPassword, roomImage, setRoomTitle, setRoomPassword, setRoomImage, resetRoom } = useRoomStore();
// 이미지를 저장할 상태 //
const [roomImageUrl, setRoomImageUrl] = useState<string>('')
// 채팅방 상태 //
const [room, setRoom] = useState<GetRoomResponseDto | null>(null);
// 이미지를 저장할 상태 //
const [roomImageState, setRoomImageState] = useState<string>('');

// 생성 버튼 Ref 상태 //
const createButtonRef = useRef<HTMLDivElement | null>(null);


// 파일 업로드 //
const fileUpload = async () => {
  if (roomImage === null) return null;

  const data = new FormData();
  data.append('file', roomImage);

  const imageUrl = await uploadFileRequest(data);
  return imageUrl;
}

// Room imageUrl 변경 이벤트 //
const onImageInputChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
  if(!event.target.files || !event.target.files.length) return;
  const imageUrl = URL.createObjectURL(event.target.files[0]);
  setRoomImageState(imageUrl);
  setRoomImage(event.target.files[0])
}

// Room 생성 함수 //
const postRoomResponseHandler = (responseBody : PostRoomResponseDto | ResponseDto) => {
  const { code } = responseBody;
  if (code == 'NE') alert('존재하지 않는 사용자 이메일입니다.');
  if (code == 'VF') alert('필수 데이터를 입력하지 않았습니다.');
  if (code == 'DE') alert('데이터베이스 에러입니다.');
  if (code == 'SU') {
    const { roomNumber } = responseBody as PostRoomResponseDto;
    alert('채팅방이 생성되었습니다. 해당 채팅방으로 이동합니다.');
    navigator(ROOM_DETAIL_PATH(roomNumber));
  }

  if(!user) {
    alert('로그인이 필요합니다.')
    navigator(AUTHENTICATION_PATH);
    return;
  }
}

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
}


// 방 이름 변경 이벤트 처리 함수 //
const onRoomNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const roomName = event.target.value;
  setRoomName(roomName);
}

// 방 비밀번호 변경 이벤트 처리 함수 //
const onRoomPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const roomPassword = event.target.value;
  setPasswordInput(roomPassword);
}

// 채팅방 만들기 생성 클릭 이벤트 //
const onCreateClickHandler = async () => {
  const token = cookies.accessToken;

  const imageUrl = roomImage ? await fileUpload() : roomImage;

    
  const data : PostRoomRequestDto = {
      roomTitle: roomName,
      roomPassword: roomPasswordInput,
      roomImageUrl: imageUrl
    }
    
    setRoomTitle(roomTitle);
    setRoomPassword(roomPassword);
    setRoomImageUrl(roomImageUrl);
    postRoomRequest(data, token).then(postRoomResponseHandler);
  
}
// 채팅방 만들기 취소 클릭 이벤트 //
const onCancelClickHandler = () => {
  navigator(MAIN_PATH);
}
// 파일 업로드 버튼 클릭 이벤트 //
const onFileUploadClickHandler = () => {
  if(!fileInputRef.current) return;
  fileInputRef.current.click();
}

// Enter Key 누름 처리 //
const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key !== 'Enter') return;
  if(!createButtonRef.current) return;
  createButtonRef.current.click();
}


// roomNumber 가 바뀔 때 마다 실행 //
let roomNumberFlag = true;
useEffect(() => {
  if(roomNumberFlag) {
    roomNumberFlag = false;
    return;
  }
  if(!roomNumber) {
    alert('채팅방 번호가 잘못되었습니다.');
    navigator(MAIN_PATH);
    return;
  }
  const accessToken = cookies.accessToken;
  getRoomRequest(roomNumber, accessToken).then(getRoomResponseHandler);
}, [roomNumber]);


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
              <div className='popup-main-image-button' onClick={onFileUploadClickHandler}>
              <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onImageInputChangeHandler}/>
              </div>
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
              <input className='popup-main-bottom-room-password-input-error' type='text' placeholder='방 비밀번호를 입력해주세요.' onChange={onRoomPasswordHandler} onKeyDown={onEnterKeyDownHandler} />
              :
              <input className='popup-main-bottom-room-password-input' type='text' placeholder='방 비밀번호를 입력해주세요.' onChange={onRoomPasswordHandler} onKeyDown={onEnterKeyDownHandler} />
              }
            </div>
            <div className='popup-main-bottom-room-input-error-box'>
              {roomPasswordError ? 
              <div className='popup-main-bottom-room-input-password-error'>비밀번호를 입력하지 않았습니다. 다시 입력해주세요.</div> 
              :
              <></>}
            </div>
            <div className='popup-main-bottom-button-box'>
              <div className='popup-main-bottom-button-create' onClick={onCreateClickHandler} ref={createButtonRef} >생성</div>
              <div className='popup-main-bottom-button-cancel' onClick={onCancelClickHandler} >취소</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )      
}
