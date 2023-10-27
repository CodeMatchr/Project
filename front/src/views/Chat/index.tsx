import React, { useState, useEffect } from 'react'

import './style.css';
import ChatManagerPopUp from '../../components/PopUp/ChatManagerNamePopUp';
import ChatManagerNamePopUp from '../../components/PopUp/ChatManagerNamePopUp';
import ChatManagerPasswordPopUp from '../../components/PopUp/ChatManagerPasswordPopUp';
import ChatManagerImagePopUp from '../../components/PopUp/ChatManagerImagePopUp';
import ChatManagerByePopUp from '../../components/PopUp/ChatManagerByePopUp';
import CompareCode from 'src/components/CompareCode';
import { useNavigate, useParams } from 'react-router-dom';
import { useRoomStore, useUserStore } from 'src/store';
import { useCookies } from 'react-cookie';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import { MAIN_PATH } from 'src/constants';
import { getRoomRequest } from 'src/apis';
import RealtimeChat from 'src/components/RealtimeChat';

// component //
export default function Chat() {

    // state //
    // room 번호 path variable 상테 //
    const { roomNumber } = useParams();
    // 로그인 유저 정보 상태 //
    const { user } = useUserStore();
    // 쿠키 상태 //
    const [cookies] = useCookies();

    const { roomTitle, roomPassword, roomImage, roomImageUrl, resetRoom, setRoomNumber, setRoomImageUrl, setRoomImage, setRoomPassword, setRoomTitle } = useRoomStore();

    // 채팅방 상태 //
    const [chat, setChat] = useState<GetRoomResponseDto | null>(null);
    // 본인의 채팅방 여부 상태 //
    const [isMyChat, setIsMyChat] =useState<boolean>(false);

    // 이름 변경 채팅방 팝업창 상태 //
    const [popUpNameState, setPopUpNameState] = useState<boolean>(false);
    // 비밀번호 변경 채팅방 팝업창 상태 //
    const [popUpPasswordState, setPopUpPasswordState] = useState<boolean>(false);
    // 이미지 변경 채팅방 팝업창 상태 //
    const [popUpImageState, setPopUpImageState] = useState<boolean>(false);
    // 나가기 채팅방 팝업창 상태
    const [popUpExitState, setPopUpExitState] = useState<boolean>(false);

    

    // function //
    // 네비게이트 함수 //
    const navigator = useNavigate();

    // 채팅방 불러오기 응답 처리 //
    const getRoomResponseHnadler = (responseBody : GetRoomResponseDto | ResponseDto) => {
        const {code} = responseBody;
        if(code === 'NR') alert('존재하지 않는 채팅방입니다.');
        if(code !== 'SU') {
            navigator(MAIN_PATH);
            return;
        }

        const { roomNumber, roomTitle, roomPassword, roomImageUrl } = responseBody as GetRoomResponseDto
        setRoomNumber(roomNumber);
        setRoomTitle(roomTitle);
        setRoomPassword(roomPassword);
        setRoomImageUrl(roomImageUrl);
    }


    // event handler //
    // 이름 변경 버튼 클릭 이벤트 //
    const onNameIconButtonClickHandler = () => {
        if(popUpNameState) {
            setPopUpNameState(false);
            setPopUpPasswordState(false);
            setPopUpImageState(false);
            setPopUpExitState(false);
        }
        else {
            setPopUpNameState(true);
            setPopUpPasswordState(false);
            setPopUpImageState(false);
            setPopUpExitState(false);
        }
    }

    // 비밀번호 변경 버튼 클릭 이벤트
    const onPasswordIconButtonClickHandler = () => {
        if(popUpPasswordState) {
            setPopUpNameState(false);
            setPopUpPasswordState(false);
            setPopUpImageState(false);
            setPopUpExitState(false);
        }
        else {
            setPopUpNameState(false);
            setPopUpPasswordState(true);
            setPopUpImageState(false);
            setPopUpExitState(false);
        }
    }

    // 이미지 변경 버튼 클릭 이벤트
    const onImageIconButtonClickHandler = () => {
        if(popUpImageState) {
            setPopUpNameState(false);
            setPopUpPasswordState(false);
            setPopUpImageState(false);
            setPopUpExitState(false);
        }
        else {
            setPopUpImageState(true);
            setPopUpNameState(false);
            setPopUpPasswordState(false);
            setPopUpExitState(false);
        }
    }

    // 나가기 버튼 클릭 이벤트
    const onExitIconButtonClickHandler = () => {
        if(popUpExitState) {
            setPopUpNameState(false);
            setPopUpPasswordState(false);
            setPopUpImageState(false);
            setPopUpExitState(false);
        }
        else {
            setPopUpExitState(true);
            setPopUpNameState(false);
            setPopUpPasswordState(false);
            setPopUpImageState(false);
        }
    }

    // effect //
    useEffect(() => {
        const accessToken = cookies.accessToken;
        if(!roomNumber) return;
        getRoomRequest(roomNumber, accessToken).then(getRoomResponseHnadler);
    }, [roomNumber, roomTitle, roomPassword, roomImageUrl]);

    
    // render //
    return (
    <div className='chat'>
        <div className='chat-top'>
            <div className='chat-top-left'>`{roomTitle} 채팅방에 입장하였습니다.`</div>
            <div className='chat-top-right'>
                <div className='chat-top-right-name-button' onClick={onNameIconButtonClickHandler}>이름 변경</div>
                {popUpNameState && <div className='chat-manager-pop-up'><ChatManagerNamePopUp selectRoomNumber={Number(roomNumber)} setPopUpNameState={setPopUpNameState}/></div>}
                <div className='chat-top-right-password-button' onClick={onPasswordIconButtonClickHandler}>비밀번호 변경</div>
                {popUpPasswordState && <div className='chat-manager-pop-up'><ChatManagerPasswordPopUp selectRoomNumber={Number(roomNumber)} setPopUpPasswordState={setPopUpPasswordState}/></div>}
                <div className='chat-top-right-iamge-button' onClick={onImageIconButtonClickHandler}>이미지 변경</div>
                {popUpImageState && <div className='chat-manager-pop-up'><ChatManagerImagePopUp selectRoomNumber={Number(roomNumber)} setPopUpImageState={setPopUpImageState}/></div>}
                <div className='chat-top-right-exit-button' onClick={onExitIconButtonClickHandler}>나가기</div>
                {popUpExitState && <div className='chat-manager-pop-up'><ChatManagerByePopUp selectRoomNumber={Number(roomNumber)} setPopUpExitState={setPopUpExitState}/></div>}
            </div>
        </div>
        <div className='chat-mid'>
            <CompareCode/>
        </div>
        <RealtimeChat roomNumber={roomNumber} />
    </div>
    )
}
