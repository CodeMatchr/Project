import React, { useState } from 'react'

import './style.css';
import ChatManagerPopUp from '../../components/PopUp/ChatManagerPopUp';

// component //
export default function Chat() {

    // state //
    // 이름 변경 채팅방 팝업창 상태 //
    const [popUpNameState, setPopUpNameState] = useState<boolean>(false);
    // 비밀번호 변경 채팅방 팝업창 상태 //
    const [popUpPasswordState, setPopUpPasswordState] = useState<boolean>(false);
    // 이미지 변경 채팅방 팝업창 상태 //
    const [popUpImageState, setPopUpImageState] = useState<boolean>(false);
    // 나가기 채팅방 팝업창 상태
    const [popUpExitState, setPopUpExitState] = useState<boolean>(false);

    // function //

    // event handler //
    // 이름 변경 버튼 클릭 이벤트 //
    const onNameIconButtonClickHandler = () => {
        if(popUpNameState) setPopUpNameState(false);
        else setPopUpNameState(true);
    }

    // 비밀번호 변경 버튼 클릭 이벤트
    const onPasswordIconButtonClickHandler = () => {
        if(popUpPasswordState) setPopUpPasswordState(false);
        else setPopUpPasswordState(true);
    }

    // 이미지 변경 버튼 클릭 이벤트
    const onImageIconButtonClickHandler = () => {
        if(popUpImageState) setPopUpImageState(false);
        else setPopUpImageState(true);
    }

    // 나가기 버튼 클릭 이벤트
    const onExitIconButtonClickHandler = () => {
        if(popUpExitState) setPopUpExitState(false);
        else setPopUpExitState(true);
    }

    // effect //

    // render //
    return (
    <div className='chat'>
        <div className='chat-top'>
            <div className='chat-top-left'>채팅방에 입장하였습니다.</div>
            <div className='chat-top-right'>
                <div className='chat-top-right-name-button' onClick={onNameIconButtonClickHandler}>이름 변경</div>
                {popUpNameState && <div className='chat-manager-pop-up'><ChatManagerPopUp/></div>}
                <div className='chat-top-right-password-button' onClick={onPasswordIconButtonClickHandler}>비밀번호 변경</div>
                {popUpPasswordState && <div className='chat-manager-pop-up'><ChatManagerPopUp/></div>}
                <div className='chat-top-right-iamge-button' onClick={onImageIconButtonClickHandler}>이미지 변경</div>
                {popUpImageState && <div className='chat-manager-pop-up'><ChatManagerPopUp/></div>}
                <div className='chat-top-right-exit-button' onClick={onExitIconButtonClickHandler}>나가기</div>
                {popUpExitState && <div className='chat-manager-pop-up'><ChatManagerPopUp/></div>}
            </div>
        </div>
        <div className='chat-mid'>코드 비교 영역</div>
        <div className='chat-bottom'>
            <div className='chat-bottom-top'>채팅방 이름</div>
            <div className='chat-bottom-mid'>
                <div className='chat-bottom-mid-chat'>
                    <div className='chat-user-profile-image'>icon</div>
                    <div className='chat-user-nickname'>접속자 닉네임</div>
                    <div className='chat-contents'>채팅 내용</div>
                    <div className='chat-datetime'>채팅 시간</div>
                </div>
                <div className='chat-bottom-mid-my-chat'>
                    <div className='chat-my-datetime'>채팅 시간</div>
                    <div className='chat-my-contents'>채팅 내용</div>
                </div>
                <div className='chat-bottom-bottom'>
                    <input className='chat-bottom-bottom-input' placeholder='채팅 메세지를 입력해주세요.'/>
                    <div className='chat-bottom-bottom-button'>전송</div>
                </div>
            </div>
            
        </div>
    </div>
    )
}
