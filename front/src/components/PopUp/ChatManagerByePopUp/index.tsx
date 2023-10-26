import React, { useState, useRef, Dispatch, SetStateAction, useEffect, DOMAttributes } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH, ROOM_DETAIL_PATH, ROOM_PATH } from '../../../constants';
import { useCookies } from 'react-cookie';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import { useRoomStore, useUserStore } from 'src/store';
import { DeleteRoomRequest, PatchRoomExitRequest, getRoomRequest } from 'src/apis';
import PatchRoomExitRequsetDto from 'src/interfaces/request/room/patch-room-exit-request.dto';

interface Props {
    selectRoomNumber : number;
    setPopUpExitState : Dispatch<SetStateAction<boolean>>;
}

//            component           //
// description : 채팅방 매니저 팝업창 //
export default function ChatManagerByePopUp({selectRoomNumber, setPopUpExitState} : Props) {

    //            state           //
    const { roomNumber, roomTitle, roomPassword, roomImage, roomImageUrl, resetRoom, setRoomNumber, setRoomImageUrl, setRoomImage, setRoomPassword, setRoomTitle } = useRoomStore();
    const { user } = useUserStore();

    const [cookies, setCookie] = useCookies();

    // 채팅방 상태 //
    const [room, setRoom] = useState<GetRoomResponseDto | null>(null);

    const [roomNumberFlag, setRoomNumberFlag] = useState<boolean>(true);

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

        const room = responseBody as GetRoomResponseDto;
        console.log(room);

        setRoom(room);
        setRoomNumber(room.roomNumber);
        setRoomTitle(room.roomTitle);
    }

    // 채팅방 삭제 응답 처리 //
    const deleteRoomResponseHandler = (code : string) => {
        if (code == 'NE') alert('존재하지 않는 사용자 이메일입니다.');
        if (code == 'NR') alert('존재하지 않는 다인원 채팅방 번호입니다.');
        if (code == 'NP') alert('권한이 없습니다.');
        if (code != 'SU') return;

        resetRoom();
        setPopUpExitState(false);
        navigator(MAIN_PATH);
    }

    // 채팅방 나가기 응답 처리 //
    const patchRoomExitResponseHandler = (code : string) => {
        if (code == 'NE') alert('존재하지 않는 사용자 이메일입니다.');
        if (code == 'NR') alert('존재하지 않는 다인원 채팅방 번호입니다.');
        if (code != 'SU') return;

        resetRoom();
        navigator(MAIN_PATH);
    }
    
    //            event handler           //
    // description : 취소 버튼 클릭 이벤트 //
    // todo : 변경 위치 다시 확인해서 수정해야함 //
    const onCancelClickHandler = () => {
        setPopUpExitState(false);
    }
    // description : 나가기 버튼 클릭 이벤트 //
    // todo : 변경 위치 다시 확인해서 수정해야함 //
    const onExitClickHandler = async () => {
        const token = cookies.accessToken;
        const data : PatchRoomExitRequsetDto = {}
        console.log(room);
        console.log(user);
        if (!room || !user) return;
        const isManager = room.roomManagerEmail === user.userEmail;
        if (isManager) {
            DeleteRoomRequest(roomNumber, token).then(deleteRoomResponseHandler);
        } else {
            PatchRoomExitRequest(roomNumber, data, token).then(patchRoomExitResponseHandler);
        }
        setPopUpExitState(false);
    }

    //            effect           //
    useEffect(() => {
        if (!selectRoomNumber) {
            alert('채팅방 번호가 잘못되었습니다.');
            navigator(ROOM_DETAIL_PATH(roomNumber));
            return;
        }
        const accessToken = cookies.accessToken;
        getRoomRequest(selectRoomNumber, accessToken).then(getRoomResponseHnadler);
        }, [selectRoomNumber, roomTitle]);

    //            render           //
    return (
    <div id='popup-manager-wrapper'>
        <div className='popup-manager-box'>
            <div className='popup-manager-top-box'>
                <div className='popup-manager-top-title'>채팅방 나가기</div>
            </div>
            <div className='popup-manager-middle-box'>
                <div className='popop-manager-middle-file-box'>
                    <div className='popup-manager-middle-file'></div>
                </div>
                <div className='popup-manager-middle-text-box'>
                    <div className='popup-manager-middle-text'>
                    <textarea className='popup-manager-middle-text-input-detail' placeholder='채팅방을 나가시겠습니까?&#13;&#10;방장의 경우 채팅방이 전체 삭제됩니다.' readOnly/>
                    </div>
                </div>
            </div>
            <div className='popup-manager-bottom-box'>
                <div className='popup-manager-bottom-button-change-box'>
                    <div className='popup-manager-bottom-button-change' onClick={onExitClickHandler}>확인</div>
                </div>
                <div className='popup-manager-bottom-button-cancel-box'>
                    <div className='popup-manager-bottom-button-cancel' onClick={onCancelClickHandler}>취소</div>
                </div>
            </div>
        </div>
    </div>
  )
}
