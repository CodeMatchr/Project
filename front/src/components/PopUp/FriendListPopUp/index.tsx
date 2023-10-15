import React from 'react';

import './style.css';
import { usePagination } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

// component //
export default function FriendListPopUp() {

    // state //
    // 페이지네이션과 관련된 상태 및 함수
    const{totalPage, currentPage, currentSection, onPageClickHandler, onPreviousClickHandler, onNextClickHandler, changeSection} = usePagination();

    // function //
    const navigator = useNavigate();

    // const getPageRoomList = (roomList : RoomListResponseDto[]) => {
    //     const startIndex = MAIN_ROOM_COUNT_BY_PAGE * (currentPage - 1);
    //     const lastIndex = roomList.length > MAIN_ROOM_COUNT_BY_PAGE * currentPage ?
    //       MAIN_ROOM_COUNT_BY_PAGE * currentPage : roomList.length;
    //     const pageRoomList = roomList.slice(startIndex, lastIndex);
  
    //     setPageRoomList(pageRoomList);
    //   }

    // event handler //

    // effect //

    // render //
    return (
        <div className='friend-list'>
            <div className='friend-list-wrap'>
                <div className='friend-list-exit-button'>X</div>
                <div className='friend-list-title'>친구 목록</div>
                <div className='friend-list-mine'>
                    <div className='friend-list-mine-title'>내 친구</div>
                    {/* map 함수 돌릴것 3개씩 보이게(페이지네이션 O) */}
                    <div className='friend-list-mine-box'>
                        <div className='friend-list-mine-friend-profile'>icon</div>
                        <div className='friend-list-mine-friend-nickname'>nickname</div>
                        <div className='friend-list-mine-friend-state-message'>state message</div>
                    </div>
                </div>
                <div className='friend-list-recommend'>
                    <div className='friend-list-recommend-top'>
                        <div className='friend-list-recommend-title'>친구 추천</div>
                        <div className='friend-list-recommend-refresh'>새로 고침</div>
                    </div>
                    <div className='friend-list-recommend-bottom'>
                        {/* map 함수 돌릴것 5개씩만 보일것(페이지네이션 X) */}
                        <div className='friend-list-recommend-bottom-left'>
                            <div className='friend-list-recommend-profile'>icon</div>
                            <div className='friend-list-recommend-nickname'>nickname</div>
                            <div className='friend-list-recommend-state-message'>상태 메세지</div>
                        </div>
                        <div className='friend-add-button'>친구추가</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
