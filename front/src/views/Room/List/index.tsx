import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';

import './style.css';
import RoomListResponseDto from '../../../interfaces/response/room/room-list.response.dto';
import Pagination from '../../../components/Pagination';
import { COUNT_BY_PAGE, MAIN_PATH, MAIN_ROOM_COUNT_BY_PAGE_FUll, ROOM_SEARCH_PATH } from '../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePagination } from '../../../hooks';
import RoomFullListItem from '../../../components/RoomFullListItem';
import ChatComePopUP from '../../../components/PopUp/ChatComePopUp';
import GetCurrentRoomListResponseDto from 'src/interfaces/response/room/get-current-room-list.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import { GetCurrentRoomListRequest } from 'src/apis';
import GetSearchRoomResponseDto from 'src/interfaces/response/room/get-search-room.response.dto';

export default function Room() {

  // 페이지네이션과 관련된 상태 및 함수
  const{totalPage, currentPage, currentSection, onPageClickHandler, onPreviousClickHandler, onNextClickHandler, changeSection} = usePagination();  
  // Room 에 해당하는 전체 리스트 상태
  const[currentRoomList, setCurrentRoomList] = useState<RoomListResponseDto[]>([]);
  // Room 에 해당하는 전체 갯수 상태
  const[roomCount, setRoomCount] = useState<number>(0);
  // Room 현재 페이지에서 보여줄 Room 게시물 리스트 상태
  const[pageRoomList, setPageRoomList] = useState<RoomListResponseDto[]>([])
  
  // 검색 아이콘 버튼 클릭 상태 //
  const[searchIconState, setSearchIconState] = useState<boolean>(false);
  // 채팅방 팝업창 상태 //
  const [popUpRoomVisible, setPopUpRoomVisible] = useState<boolean>(false);
  // 채팅방 팝업창 상태 //
  const [selectRoomNumber, setSelectRoomNumber] = useState<string>('');
  // 검색어 상태 //
  const[searchWord, setSearchWord] = useState<string>('');

  // 전체 게시물 리스트 //
  const [searchRoomList, setSearchRoomList] = useState<RoomListResponseDto[]>([]);
  
  // url 경로 상태 //
  const { pathname } = useLocation();
  // 검색버튼 Ref 상태 //
  const searchButtonRef = useRef<HTMLDivElement | null>(null);

  const navigator = useNavigate();


  const getPageRoomList = (roomList : RoomListResponseDto[]) => {
    const startIndex = MAIN_ROOM_COUNT_BY_PAGE_FUll * (currentPage - 1);
    const lastIndex = roomList.length > MAIN_ROOM_COUNT_BY_PAGE_FUll * currentPage ?
    MAIN_ROOM_COUNT_BY_PAGE_FUll * currentPage : roomList.length;
    const pageRoomList = roomList.slice(startIndex, lastIndex);

    setPageRoomList(pageRoomList);
  }

  const getSearchRoomResponseHandler = (responseBody : GetSearchRoomResponseDto | ResponseDto) => {
    
    const {code} = responseBody;
    if(code === 'VF') alert('잘못된 입력입니다.');
    if(code === 'DE') alert('데이터 베이스 오류입니다.');
    if(code !== 'SU') return;

    const {roomList} = responseBody as GetSearchRoomResponseDto;
    setSearchRoomList(roomList);
    setRoomCount(roomList.length);
    getPageRoomList(roomList);
    changeSection(roomList.length, MAIN_ROOM_COUNT_BY_PAGE_FUll);
  }

  // 현재 모든 다인원 채팅방 리스트 응답처리 함수 //
  const getCurrentRoomListResponseHandler = (responseBody : GetCurrentRoomListResponseDto | ResponseDto) => {
    const { code } = responseBody;
    if(code === 'DE') alert('데이터베이스 에러입니다.');
    if(code !== 'SU') return;

    const { roomList } = responseBody as GetCurrentRoomListResponseDto;

    setRoomCount(roomList.length);
    getPageRoomList(roomList);
    setCurrentRoomList(roomList);
    changeSection(roomList.length, MAIN_ROOM_COUNT_BY_PAGE_FUll)
  }


  // 검색 아이콘 버튼 클릭 이벤트 //
  const onSearchIconButtonClickHandler = () => {
    if (searchIconState == true) setSearchIconState(false);
    else setSearchIconState(true);
  }

  const onRoomListItemClickHandler = (roomNumber: number) => {
    setPopUpRoomVisible(true);
    setSelectRoomNumber(String(roomNumber));
  }

  const onSearchChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  }

  // 검색 버튼 클릭 이벤트 //
  const onSearchButtonClickHandler = () => {
    if(!searchWord){
        alert('검색어를 입력해주세요.');
        return;
    }
    navigator(ROOM_SEARCH_PATH(searchWord));
    
}

// 검색창 엔터 //
const onSearchEnterPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key !== 'Enter') return;
  if (!searchButtonRef.current) return;
  searchButtonRef.current.click();
}


  // effect //
  // 현재 페이지가 바뀔때 마다 Room 리스트 변경//
  useEffect(() => {
    getPageRoomList(currentRoomList);
  }, [currentPage])

  // 현재 섹션이 바뀔때 마다 페이지 리스트 변경 //
  useEffect(() => {
    changeSection(currentRoomList.length, MAIN_ROOM_COUNT_BY_PAGE_FUll);
  }, [currentSection]);

  useEffect(() => {
    GetCurrentRoomListRequest(currentSection).then(getCurrentRoomListResponseHandler);
  }, [currentSection]);

  

  // render //
  return (
    <div className='room'>
      <div className='room-top'>
        <div className='room-top-title'>Room</div>
          {(searchIconState) ? (
            <div className='room-top-right'>
              <input className='room-top-right-search-input' placeholder='검색어를 입력해주세요.' value={searchWord} onChange={onSearchChangeHandler} onKeyDown={onSearchEnterPressHandler} />
              <div className='room-top-right-search-icon-button' onClick={ onSearchButtonClickHandler } ref={searchButtonRef}></div>
            </div>
          ) : (
            <div className='room-top-right-search-icon-only'>
            <div className='room-top-right-search-icon-button' onClick={ onSearchIconButtonClickHandler }></div>
            </div>
          )}
      </div>
      <div className='room-bottom'>
        {pageRoomList.map((item) => <RoomFullListItem onClick={() => onRoomListItemClickHandler(item.roomNumber)} item={item}/>)}
        {popUpRoomVisible && <div className='chat-room-pop-up'><ChatComePopUP selectRoomNumber={selectRoomNumber} /></div>}
      </div>
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPreviousClickHandler={onPreviousClickHandler}
        onNextClickHandler={onNextClickHandler}
        onPageClickHandler={onPageClickHandler}/>
    </div>
  )
}
