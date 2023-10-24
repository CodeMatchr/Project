import React from 'react';

import './style.css';
import RoomListResponseDto from '../../interfaces/response/room/room-list.response.dto';
import { useNavigate } from 'react-router-dom';

interface Props {
    onClick: () => void
    item: RoomListResponseDto;
}

export default function RoomFullListItem({onClick, item} : Props) {
  // state //
  const { roomNumber, roomTitle, roomImageUrl } = item;
  const { roomUserCount } = item;
  const { roomManagerNickname, roomManagerProfileImageUrl } = item;

  const roomImageBackground =  roomImageUrl ? { backgroundImage : `url(${roomImageUrl})` } : { backgroundColor : 'rgba(0, 0, 0, 0.6)' };
  const roomManagerImageBackground = roomManagerProfileImageUrl ? { backgroundImage : `url(${roomManagerProfileImageUrl})` } : { backgroundColor: 'rgba(0, 0, 0, 0.6)' };


  // function //
  const navigator = useNavigate();

  // event handler //
  const onClickHandler = () => {
    
  }

  // effect //

  // render //
  return (
      <div className='room-list-full' onClick={onClick}>
            <div className='room-list-full-room-left'>
                <div className='room-list-full-room-left-profile' style={roomImageBackground}></div>
                <div className='room-list-full-room-left-title'>{roomTitle}</div>
            </div>
            <div className='room-list-full-room-right'>
                <div className='room-list-full-room-right-member-count'>{`인원수 ${roomUserCount}`}</div>
                <div className='room-list-full-room-right-manager-profile' style={roomManagerImageBackground}></div>
                <div className='room-list-full-room-right-manager-nickname'>{roomManagerNickname}</div>
            </div>
      </div>
  )
}
