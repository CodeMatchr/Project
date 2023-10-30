import React, { useState } from 'react';

import RoomListResponseDto from '../../interfaces/response/room/room-list.response.dto';
import './style.css';

interface Props {
    onClick: () => void;
    item: RoomListResponseDto;
}

export default function RoomListItem({onClick, item} : Props) {

    const { roomNumber, roomTitle, roomImageUrl } = item;
    const { roomUserCount } = item;
    const { roomManagerNickname } = item;

    const roomImageBackground =  roomImageUrl ? { backgroundImage : `url(${roomImageUrl})` } : { backgroundColor : 'rgba(0, 0, 0, 0.6)' };

    // 채팅방 팝업창 상태 //
    const [popUpVisible, setPopUpVisible] = useState<boolean>(false);


    // 채팅방 입장 버튼 클릭 이벤트
    const onRoomEnterIconButtonClickHandler = () => {
        if (popUpVisible) setPopUpVisible(false);
        else setPopUpVisible(true);
    }

    
    return (
        <div className='room-list' onClick={onClick}>
            <div className='room-list-room-profile' style={roomImageBackground}></div>
            <div className='room-list-room-title'>{roomTitle}</div>
            <div className='room-list-room-manager-nickname'>{roomManagerNickname}</div>
            <div className='room-list-room-member-count'>{`인원수 ${roomUserCount}`}</div>
        </div>
        
    )
}
