import React, { useState, useRef, ChangeEvent, useEffect, Dispatch, SetStateAction } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH, ROOM_DETAIL_PATH, ROOM_PATH } from '../../../constants';
import { useRoomStore } from 'src/store';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import { useCookies } from 'react-cookie';
import { PatchRoomTitleRequestDto } from 'src/interfaces/request/room';
import { PatchRoomTitleRequest, getRoomRequest } from 'src/apis';

interface Props {
    selectRoomNumber : number;
    setPopUpNameState: Dispatch<SetStateAction<boolean>>;
}

//            component           //
// description : 채팅방 매니저 팝업창 //
export default function ChatManagerNamePopUp({selectRoomNumber, setPopUpNameState} : Props) {
    //            state           //
    // description : 네비게이터 //
    const navigator = useNavigate();

    const { roomNumber, roomTitle, roomPassword, roomImage, roomImageUrl, resetRoom, setRoomNumber, setRoomImageUrl, setRoomImage, setRoomPassword, setRoomTitle } = useRoomStore();

    const [cookies, setCookie] = useCookies();

    // description : 채팅방 이름 변경 인풋 상태 //
    const [roomNameInputChange, setRoomNameInputChange] = useState<string>('');

    // 채팅방 상태 //
    const [room, setRoom] = useState<GetRoomResponseDto | null>(null);

    // 
    const [roomNumberFlag, setRoomNumberFlag] = useState<boolean>(true);



    //            function           //
    // 채팅방 불러오기 응답 처리 //
    const getRoomResponseHnadler = (responseBody : GetRoomResponseDto | ResponseDto) => {
        const {code} = responseBody;
        if (code == 'NR') alert('존재하지 않는 채팅방입니다.');
        // if (code == 'NE') alert('존재하지 않는 사용자 이메일입니다.');
        if (code != 'SU') {
            navigator(MAIN_PATH);
            return;
        }

        const room = responseBody as GetRoomResponseDto;
                
        setRoom(room);
        setRoomNumber(room.roomNumber);
        setRoomTitle(room.roomTitle);

    }

    // description : 다인원 채팅방 제목 변경 이벤트 //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomNameInputChange(event.target.value);
    }

    const patchRoomTitleResponseHandler = (code : string) => {
        if (code == 'NE') alert('존재하지 않는 사용자 이메일입니다.');
        if (code == 'NR') alert('존재하지 않는 다인원 채팅방 번호입니다.');
        if (code == 'NP') alert('권한이 없습니다.');
        if (code == 'ER') alert('이미 설정되어 있는 다인원 채팅방 제목입니다.');
        if (code == 'SU') alert('변경에 성공했습니다.');
        if (code != 'SU') return;
    
        resetRoom();

        if(!roomNumber) return;
        setPopUpNameState(false);
    }

    
    //            event handler           //
    // 변경 버튼 클릭 이벤트 //
    const onChangeClickHandler = async () => {
        const token = cookies.accessToken;

        const data : PatchRoomTitleRequestDto = {
            roomTitle : roomNameInputChange
        }

        PatchRoomTitleRequest(roomNumber, data, token).then(patchRoomTitleResponseHandler);
        console.log("5" + roomNumber);
    }

    // description : 취소 버튼 클릭 이벤트 //
    const onCancelClickHandler = () => {
        setPopUpNameState(false);
    }

    //            effect           //
    useEffect(() => {
    if(roomNumberFlag) {
        setRoomNumberFlag(false);
        return;
    }
    if (!selectRoomNumber) {
        alert('채팅방 번호가 잘못되었습니다.');
        navigator(ROOM_DETAIL_PATH(roomNumber));
        return;
    }
    // if(!roomNumber) {
    //     alert('채팅방 번호가 잘못되었습니다.');
    //     navigator(MAIN_PATH);
    //     return;
    // }
    const accessToken = cookies.accessToken;
    getRoomRequest(selectRoomNumber, accessToken).then(getRoomResponseHnadler);
    }, [selectRoomNumber, roomTitle]);

    
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
