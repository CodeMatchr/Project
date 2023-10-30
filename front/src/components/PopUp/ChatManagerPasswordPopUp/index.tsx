import React, { useState, useRef, ChangeEvent, useEffect, SetStateAction, Dispatch, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRoomStore } from 'src/store';
import { PatchRoomPasswordRequest, getRoomRequest } from 'src/apis';
import { MAIN_PATH, ROOM_DETAIL_PATH } from '../../../constants';
import { PatchRoomPasswordRequestDto } from 'src/interfaces/request/room';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import './style.css';

interface Props {
    selectRoomNumber : number;
    setPopUpPasswordState : Dispatch<SetStateAction<boolean>>;
}

// 채팅방 매니저 비밀번호 팝업창 //
export default function ChatManagerPasswordPopUp({selectRoomNumber, setPopUpPasswordState} : Props) {

    const { roomNumber, roomTitle, roomPassword, roomImage, roomImageUrl, resetRoom, setRoomNumber, setRoomImageUrl, setRoomImage, setRoomPassword, setRoomTitle } = useRoomStore();

    const [cookies, setCookie] = useCookies();

    // 채팅방 비밀번호 변경 인풋 상태 //
    const [roomPasswordInputChange, setRoomPasswordInputChange] = useState<string>('');

    // 채팅방 상태 //
    const [room, setRoom] = useState<GetRoomResponseDto | null>(null);

    const [roomNumberFlag, setRoomNumberFlag] = useState<boolean>(true);

    // 변경 버튼 Ref 상태 //
    const changeButtonRef = useRef<HTMLDivElement | null>(null);


    const navigator = useNavigate();

    // 채팅방 불러오기 응답 처리 //
    const getRoomResponseHnadler = (responseBody : GetRoomResponseDto | ResponseDto) => {
        const {code} = responseBody;
        if (code == 'NR') alert('존재하지 않는 채팅방입니다.');
        if (code != 'SU') {
            navigator(MAIN_PATH);
            return;
        }

        const room = responseBody as GetRoomResponseDto;
    
        setRoom(room);
        setRoomNumber(room.roomNumber);
        setRoomPassword(room.roomPassword);
    }

    // 비밀번호 변경 이벤트 //
    const onRoomPasswordChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        setRoomPasswordInputChange(event.target.value);
    }

    const patchRoomPasswordResponseHandler = (code : string) => {
        if (code == 'NE') alert('존재하지 않는 사용자 이메일입니다.');
        if (code == 'NR') alert('존재하지 않는 다인원 채팅방 번호입니다.');
        if (code == 'NP') alert('권한이 없습니다.');
        if (code == 'EP') alert('이미 설정되어 채팅방 비밀번호입니다.');
        if (code == 'SU') alert('변경에 성공했습니다.');
        if (code != 'SU') return;

        resetRoom();

        if(!roomNumber) return;
        setPopUpPasswordState(false);
    }

    // 변경 버튼 클릭 이벤트 //
    const onChangeClickHandler = async () => {
        const token = cookies.accessToken;

        const data : PatchRoomPasswordRequestDto = {
            roomPassword : roomPasswordInputChange
        }

        PatchRoomPasswordRequest(roomNumber, data, token).then(patchRoomPasswordResponseHandler);
    }
    // 취소 버튼 클릭 이벤트 //
    const onCancelClickHandler = () => {
        setPopUpPasswordState(false);
    }
    // Enter Key 누름 처리 //
    const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key !== 'Enter') return;
        if(!changeButtonRef.current) return;
        changeButtonRef.current.click();
    }

    useEffect(() => {
        if(roomNumberFlag) {
            setRoomNumberFlag(false);
            return;
        }
        if(!selectRoomNumber) {
            alert('채팅방 번호가 잘못되었습니다.');
            navigator(ROOM_DETAIL_PATH(roomNumber));
            return;
        }
        const accessToken = cookies.accessToken;
        getRoomRequest(selectRoomNumber, accessToken).then(getRoomResponseHnadler);
        }, [selectRoomNumber, roomPassword]);

        
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
                        <input className='popup-manager-middle-text-input' placeholder='변경할 비밀번호를 입력해주세요.' onChange={onRoomPasswordChangeHandler} onKeyDown={onEnterKeyDownHandler}></input>
                    </div>
                </div>
            </div>
            <div className='popup-manager-bottom-box'>
                <div className='popup-manager-bottom-button-change-box'>
                    <div className='popup-manager-bottom-button-change' onClick={onChangeClickHandler} ref={changeButtonRef}>변경</div>
                </div>
                <div className='popup-manager-bottom-button-cancel-box'>
                    <div className='popup-manager-bottom-button-cancel' onClick={onCancelClickHandler}>취소</div>
                </div>
            </div>
        </div>
    </div>
  )
}
