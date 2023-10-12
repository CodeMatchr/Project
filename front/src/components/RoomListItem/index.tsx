import React from 'react';

import './style.css';
import RoomListResponseDto from '../../interfaces/response/room/room-list.response.dto';

interface Props {
    item: RoomListResponseDto;
}

// component //
export default function RoomListItem({item} : Props) {

    // state //
    const { roomNumber, roomTitle, roomImageUrl } = item;
    const { roomMemberCount } = item;
    const { roomManagerNickname } = item;

    const roomImageBackground =  roomImageUrl ? { backgroundImage : `url(${roomImageUrl})` } : { backgroundColor : 'rgba(0, 0, 0, 0.6)' };


    // function //

    // event handler //

    // effect //

    // render //
    return (
        <div className='room-list'>
            <div className='room-list-room-profile' style={roomImageBackground}></div>
            <div className='room-list-room-title'>{roomTitle}</div>
            <div className='room-list-room-manager-nickname'>{roomManagerNickname}</div>
            <div className='room-list-room-member-count'>{`인원수 ${roomMemberCount}`}</div>
        </div>
    )
}
