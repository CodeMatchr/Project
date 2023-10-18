import React, { useState, useRef, ChangeEvent } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH, ROOM_PATH } from '../../../constants';
import { useRoomStore } from 'src/store';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';

// interface Props {
//     popUpType: string
// { popUpType }: Props
// }

//            component           //
// description : 채팅방 매니저 팝업창 //
export default function ChatManagerNamePopUp() {
    //            state           //
    // description : 네비게이터 //
    const navigator = useNavigate();

    const { roomTitle, roomPassword, roomImage, roomImageUrl, resetRoom, setRoomNumber, setRoomImageUrl, setRoomImage, setRoomPassword, setRoomTitle } = useRoomStore();

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
    // 채팅방 불러오기 응답 처리 //
    const getRoomResponseHnadler = (responseBody : GetRoomResponseDto | ResponseDto) => {
        const {code} = responseBody;
        if(code === 'NR') alert('존재하지 않는 채팅방입니다.');
        if(code !== 'SU') {
            navigator(MAIN_PATH);
            return;
        }

        const { roomTitle, roomPassword, roomImageUrl } = responseBody as GetRoomResponseDto
        setRoomTitle(roomTitle);
        setRoomPassword(roomPassword);
        setRoomImageUrl(roomImageUrl);
    }

    //            event handler           //
    // description : 변경 버튼 클릭 이벤트 //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomTitle(event.target.value);
    }


    // todo : 변경 위치 다시 확인해서 수정해야함 //
    const onChangeClickHandler = () => {
        navigator(ROOM_PATH);
    }
    // description : 취소 버튼 클릭 이벤트 //
    // todo : 변경 위치 다시 확인해서 수정해야함 //
    const onCancelClickHandler = () => {
        navigator(MAIN_PATH);
    }
    // description : 나가기 버튼 클릭 이벤트 //
    // todo : 변경 위치 다시 확인해서 수정해야함 //
    const onExitClickHandler = () => {
        navigator(MAIN_PATH);
    }
    // description : 파일 업로드 버튼 클릭 이벤트 //
    const onFileUploadClickHandler = () => {
        if(!fileInputRef.current) return;
        fileInputRef.current.click();
    }
    //            component           //
    //            effect           //
    //            render           //
    return (
    <div id='popup-manager-wrapper'>
        <div className='popup-manager-box'>
            <div className='popup-manager-top-box'>
                <div className='popup-manager-top-title'>채팅방 이름 변경</div>
            </div>
            <div className='popup-manager-middle-box'>
                <div className='popop-manager-middle-file-box'>
                    <div className='popup-manager-middle-file'></div>
                </div>
                <div className='popup-manager-middle-text-box'>
                    <div className='popup-manager-middle-text'>
                        <input className='popup-manager-middle-text-input' placeholder='변경할 이름을 입력해주세요.' onChange={onTitleChangeHandler}></input>
                    </div>
                </div>
            </div>
            <div className='popup-manager-bottom-box'>
                <div className='popup-manager-bottom-button-change-box'>
                    <button className='popup-manager-bottom-button-change' onClick={onExitClickHandler}>변경</button>
                </div>
                <div className='popup-manager-bottom-button-cancel-box'>
                    <button className='popup-manager-bottom-button-cancel' onClick={onCancelClickHandler}>취소</button>
                </div>
            </div>
        </div>
    </div>
  )
}
