import React, { useState, useRef, ChangeEvent } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH, ROOM_DETAIL_PATH, ROOM_PATH } from '../../../constants';
import { useCookies } from 'react-cookie';
import { useRoomStore } from 'src/store';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import { PatchRoomPasswordRequestDto } from 'src/interfaces/request/room';
import { PatchRoomPasswordRequest } from 'src/apis';

// interface Props {
//     popUpType: string
// { popUpType }: Props
// }

//            component           //
// description : 채팅방 매니저 팝업창 //
export default function ChatManagerPasswordPopUp() {
    //            state           //
    const { roomNumber, roomTitle, roomPassword, roomImage, roomImageUrl, resetRoom, setRoomNumber, setRoomImageUrl, setRoomImage, setRoomPassword, setRoomTitle } = useRoomStore();

    const [cookies, setCookie] = useCookies();

    // description : 채팅방 변경 상태 //
    // todo : 채팅방에서 변경 버튼 클릭시 string으로? boolean? //
    const [roomChanege, setRoomChange] = useState<boolean>(true);
    // description : 채팅방 인풋 상태 //
    const [roomInputChange, setRoomInputChange] = useState<boolean>(true);

    // description : 채팅방 이름 변경 상태 //
    const [roomNameChange, setRoomNameChange] = useState<boolean>(true);
    // description : 채팅방 이름 변경 인풋 상태 //
    const [roomNameInputChange, setRoomNameInputChange] = useState<boolean>(true);
    
    // description : 채팅방 비밀번호 변경 상태 //
    const [roomPasswordChanege, setRoomPasswordChange] = useState<boolean>(false);
    // description : 채팅방 비밀번호 변경 인풋 상태 //
    const [roomPasswordInputChange, setRoomPasswordInputChange] = useState<boolean>(false);

    // description : 채팅방 이미지 변경 상태 //
    const [roomImageChanege, setRoomImageChange] = useState<boolean>(false);
    // description : 채팅방 이미지 변경 인풋 상태 //
    const [roomImageInputChange, setRoomImageInputChange] = useState<boolean>(false);

    // description : 채팅방 나가기 버튼 상태 //
    const [roomExit, setRoomExit] = useState<boolean>(false);

    // description : 파일 업로드 버튼 //
    const fileInputRef = useRef<HTMLInputElement>(null);


    //            function           //
    // description : 네비게이터 //
    const navigator = useNavigate();

    // 채팅방 불러오기 응답 처리 //
    const getRoomResponseHnadler = (responseBody : GetRoomResponseDto | ResponseDto) => {
        const {code} = responseBody;
        if (code == 'NR') alert('존재하지 않는 채팅방입니다.');
        if (code != 'SU') {
            navigator(MAIN_PATH);
            return;
        }

        const { roomTitle, roomPassword, roomImageUrl } = responseBody as GetRoomResponseDto
        setRoomTitle(roomTitle);
        setRoomPassword(roomPassword);
        setRoomImageUrl(roomImageUrl);
    }

    // 비밀번호 변경 이벤트 //
    const onRoomPasswordChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        setRoomPassword(event.target.value);
    }

    const patchRoomPasswordResponseHandler = (code : string) => {
        if (code == 'NE') alert('존재하지 않는 사용자 이메일입니다.');
        if (code == 'NR') alert('존재하지 않는 다인원 채팅방 번호입니다.');
        if (code == 'NP') alert('권한이 없습니다.');
        if (code == 'EP') alert('이미 설정되어 채팅방 비밀번호입니다.');
        if (code != 'SU') return;

        resetRoom();

        if(!roomNumber) return;
        navigator(ROOM_DETAIL_PATH(roomNumber));
    }

    //            event handler           //
    // description : 변경 버튼 클릭 이벤트 //
    // todo : 변경 위치 다시 확인해서 수정해야함 //
    const onChangeClickHandler = async () => {
        const token = cookies.accessToken;

        const data : PatchRoomPasswordRequestDto = {
            roomPassword : roomPassword
        }

        PatchRoomPasswordRequest(roomNumber, data, token).then(patchRoomPasswordResponseHandler);

    }
    // description : 취소 버튼 클릭 이벤트 //
    const onCancelClickHandler = () => {
        navigator(ROOM_DETAIL_PATH(roomNumber));
    }


    //            component           //
    //            effect           //
    //            render           //
    return (
    <div id='popup-manager-wrapper'>
        <div className='popup-manager-box'>
            <div className='popup-manager-top-box'>
                <div className='popup-manager-top-title'>채팅방 비밀번호 변경</div>
            </div>
            <div className='popup-manager-middle-box'>
                <div className='popop-manager-middle-file-box'>
                    <div className='popup-manager-middle-file'></div>
                </div>
                <div className='popup-manager-middle-text-box'>
                    <div className='popup-manager-middle-text'>
                        <input className='popup-manager-middle-text-input' placeholder='변경할 비밀번호를 입력해주세요.' onChange={onRoomPasswordChangeHandler}></input>
                    </div>
                </div>
            </div>
            <div className='popup-manager-bottom-box'>
                <div className='popup-manager-bottom-button-change-box'>
                    <button className='popup-manager-bottom-button-change' onClick={onChangeClickHandler}>변경</button>
                </div>
                <div className='popup-manager-bottom-button-cancel-box'>
                    <button className='popup-manager-bottom-button-cancel' onClick={onCancelClickHandler}>취소</button>
                </div>
            </div>
        </div>
    </div>
  )
}
