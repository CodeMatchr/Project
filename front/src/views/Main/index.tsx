import React, { useEffect, useState } from 'react';
import './style.css';
import Pagination from '../../components/Pagination';
import BoardListResponseDto from '../../interfaces/response/board/board-list.response.dto';
import Top3ListItem from '../../components/Top3ListItem';
import RoomListResponseDto from '../../interfaces/response/room/room-list.response.dto';
import RoomListItem from '../../components/RoomListItem';
import { usePagination } from '../../hooks';
import {AUTHENTICATION_PATH, BOARD_LIST_PATH,  COUNT_BY_PAGE,  MAIN_PATH,  MAIN_ROOM_COUNT_BY_PAGE, POPUP_ROOM_PATH, ROOM_DETAIL_PATH, ROOM_PATH, ROOM_POST_PATH} from '../../constants';
import { useNavigate} from 'react-router-dom';
import ChatRoomPopUp from '../../components/PopUp/ChatRoomPopUp';
import ChatComePopUP from '../../components/PopUp/ChatComePopUp';
import CompareCode from 'src/components/CompareCode';
import GetTop3CommentResponseDto from 'src/interfaces/response/board/getTop3Comment.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import {  GetCurrentRoomListRequest, getCommentListRequest, getCurrentListRequest, getFavoriteListRequest, getViewListRequest, postRoomRequest } from 'src/apis';
import GetTop3FavoriteResponseDto from 'src/interfaces/response/board/getTop3Favorite.response.dto';
import GetTop3ViewResponseDto from 'src/interfaces/response/board/getTop3View.response.dto';
import { useRoomStore, useUserStore } from 'src/store';
import GetRoomListResponseDto from 'src/interfaces/response/room/get-current-room-list.response.dto';
import { access } from 'fs';
import { useCookies } from 'react-cookie';
import GetCurrentRoomListResponseDto from 'src/interfaces/response/room/get-current-room-list.response.dto';

// component //
export default function Main() {

  // state //

  // function //
  // 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  
  // event handler //

  // effect //

  
  // component //
  // Main Top - Compare Code 컴포넌트 //
  const MainTop = () => {

    // state //

    // function //

    // event handler //

    // effect //

    // render //
    return(
        <CompareCode/>
    );
  }

  // component //
  // Main Mid - Top3 Board 컴포넌트 //
  const MainMid = () => {

    // state //
    // Top3 에 해당하는 Board 리스트 상태 (View(default), Favorite, Comment) //
    const[currentTop3BoardList, setCurrentTop3BoardList] = useState<BoardListResponseDto[]>([]);
    // Top3 조회수 Board 리스트 Tab 버튼 클릭 상태 //
    const[top3ViewBoardListTabState, setTop3ViewBoardListTabState] = useState<boolean>(false);
    // Top3 좋아요 수 Board 리스트 Tab 버튼 클릭 상태 //
    const[top3FavoriteBoardListTabState, setTop3FavoriteBoardListTabState] = useState<boolean>(false);
    // Top3 댓글수 Board 리스트 Tab 버튼 클릭 상태 //
    const[top3CommentBoardListTabState, setTop3CommentBoardListTabState] = useState<boolean>(false);

    // 타이틀 상태 //
    const [title, setTitle] = useState<string>('');
 
    // function //

    // top3 좋아요 //
    const getTop3FavoriteListResponseHandler = (responseBody: GetTop3FavoriteResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { top3Favorite } = responseBody as GetTop3FavoriteResponseDto;
      setCurrentTop3BoardList(top3Favorite);

        setTop3FavoriteBoardListTabState(true);
        setTop3ViewBoardListTabState(false);
        setTop3CommentBoardListTabState(false);
    }
    // top3 댓글 //
    const getTop3CommentListResponseHandler = (responseBody : GetTop3CommentResponseDto | ResponseDto) => {
      const {code} =responseBody;
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const {top3Comment} = responseBody as GetTop3CommentResponseDto;
      setCurrentTop3BoardList(top3Comment);

        setTop3CommentBoardListTabState(true);
        setTop3ViewBoardListTabState(false);
        setTop3FavoriteBoardListTabState(false);
    }

    // top3 조회수 //
    const getTop3ViewListResponseHandler = (responseBody : GetTop3ViewResponseDto | ResponseDto) => {
      const {code} = responseBody;
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const {top3View} = responseBody as GetTop3ViewResponseDto;
      setCurrentTop3BoardList(top3View);
      
        setTop3ViewBoardListTabState(true);
        setTop3FavoriteBoardListTabState(false);
        setTop3CommentBoardListTabState(false);
    }
    // top3 최신순 //
    const getTop3CurrentListResponseHandler = (responseBody : GetTop3ViewResponseDto | ResponseDto) => {
      const {code} = responseBody;
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const {top3View} = responseBody as GetTop3ViewResponseDto;
      setCurrentTop3BoardList(top3View);
      
        setTop3ViewBoardListTabState(false);
        setTop3FavoriteBoardListTabState(false);
        setTop3CommentBoardListTabState(false);
    }
  
    

    // event handler //
    // Board 리스트 페이지 이동 버튼 클릭 이벤트 //
    // todo : 나중에 게시물 리스트 페이지로 이동하도록 수정 //
    const onBoardListClickHandler = () => {
      navigator(BOARD_LIST_PATH);  
    }

    // Top3 조회수 Board 리스트 Tab 버튼 클릭 이벤트 //
    const onTop3ViewBoardListTabClickHandler = () => {
      if (top3ViewBoardListTabState) return;
      getViewListRequest().then(getTop3ViewListResponseHandler);
      setTitle('조회수 TOP 3');
    }

    // Top3 좋아요 수 Board 리스트 Tab 버튼 클릭 이벤트 //
    const onTop3FavoriteBoardListTabClickHandler = () => {
      if (top3FavoriteBoardListTabState) return;
      getFavoriteListRequest().then(getTop3FavoriteListResponseHandler);
      setTitle('좋아요 TOP 3');
    }

    // Top3 댓글수 Board 리스트 Tab 버튼 클릭 이벤트 //
    const onTop3CommentBoardListTabClickHandler = () => {
      if (top3CommentBoardListTabState) return;
      getCommentListRequest().then(getTop3CommentListResponseHandler);
      setTitle('댓글 TOP 3');
    }

    // effect //
    // 맨처음 //
    useEffect(() => {
      getViewListRequest().then(getTop3CurrentListResponseHandler);
      setTitle('최신 TOP 3');
    }, []);
    
    // render //
    return(
      <div className='main-mid'>
        <div className='main-mid-title' onClick={ onBoardListClickHandler }>TOP 3 Board</div>
        <div className='main-mid-top3-board'>
          <div className='main-mid-top3-board-tab'>
            <div className='main-mid-top3-board-tab-view-count-button' onClick={ onTop3ViewBoardListTabClickHandler } style={{ backgroundColor: top3ViewBoardListTabState ? "#ccc" : "" }}>조회수</div>
            <div className='main-mid-top3-board-tab-favorite-count-button' onClick={ onTop3FavoriteBoardListTabClickHandler } style={{ backgroundColor: top3FavoriteBoardListTabState ? "#ccc" : "" }}>좋아요 수</div>
            <div className='main-mid-top3-board-tab-comment-count-button' onClick={ onTop3CommentBoardListTabClickHandler } style={{ backgroundColor: top3CommentBoardListTabState ? "#ccc" : "" }}>댓글 수</div>
          </div>
          <div className='main-mid-top3-board-list'>
            <div className='main-mid-top3-board-list-top'>
              <div className='main-mid-top3-board-list-top-title'>{title}</div>
              <div className='main-mid-top3-board-list-top-plus-button' onClick={ onBoardListClickHandler }></div>
            </div>
            <div className='main-mid-top3-board-list-bottom'>
              {currentTop3BoardList.map((item) => (<Top3ListItem item={item}/>))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // component //
  // Main Botoom - Chat 컴포넌트 //
  const MainBottom = () => {

    // state //
    // 페이지네이션과 관련된 상태 및 함수
    const {totalPage, currentPage, currentSection, onPageClickHandler, onPreviousClickHandler, onNextClickHandler, changeSection} = usePagination();
    // 로그인 사용자 정보 상태 //
    const { user, setUser } = useUserStore();
    // Room 정보를 저장할 상태 //
    const { roomNumber, roomTitle, roomPassword, roomImage, setRoomTitle, setRoomPassword, setRoomImage, resetRoom } = useRoomStore();
    // Room 에 해당하는 전체 리스트 상태
    const [currentRoomList, setCurrentRoomList] = useState<RoomListResponseDto[]>([]);
    // Room 에 해당하는 전체 갯수 상태
    const [roomCount, setRoomCount] = useState<number>(1);
    // Room 현재 페이지에서 보여줄 Room 게시물 리스트 상태
    const [pageRoomList, setPageRoomList] = useState<RoomListResponseDto[]>([])
    // 검색어 상태 //
    const [searchWord, setSearchWord] = useState<String>('');
    // 검색 아이콘 버튼 클릭 상태 //
    const [searchIconState, setSearchIconState] = useState<boolean>(false);
    // 채팅방 팝업창 상태 //
    const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
    // 채팅방 팝업창 상태 //
    const [popUpRoomVisible, setPopUpRoomVisible] = useState<boolean>(false);
    // 채팅방 팝업창 상태 //
    const [selectRoomNumber, setSelectRoomNumber] = useState<number>(-1);


    // function //
    // 페이지네이션 //
    const getPageRoomList = (roomList : RoomListResponseDto[]) => {
      const startIndex = MAIN_ROOM_COUNT_BY_PAGE * (currentPage - 1);
      const lastIndex = roomList.length > MAIN_ROOM_COUNT_BY_PAGE * currentPage ?
        MAIN_ROOM_COUNT_BY_PAGE * currentPage : roomList.length;
      const pageRoomList = roomList.slice(startIndex, lastIndex);

      setPageRoomList(pageRoomList);
    }

    // 현재 채팅방 리스트 불러오기 응답처리 함수 //
    const getCurrnetRoomListResponseHandler = (responseBody : GetCurrentRoomListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if(code === 'DE') alert('데이터베이스 에러입니다.');
      if(code !== 'SU') return;

      const { roomList } = responseBody as GetCurrentRoomListResponseDto;
      changeSection(roomList.length, MAIN_ROOM_COUNT_BY_PAGE);
      getPageRoomList(roomList);
      // ! getPageRoomList -> 이거 없어서 메인화면에 안뜨더라구요.
      setCurrentRoomList(roomList);
    }

    // event handler //
    // Room 리스트 페이지 이동 버튼 클릭 이벤트 //
    const onRoomListButtonClickHandler = () => {
      navigator(ROOM_PATH);
    }

    // 검색 아이콘 버튼 클릭 이벤트 //
    const onSearchIconButtonClickHandler = () => {
      if (searchIconState) setSearchIconState(false);
      else setSearchIconState(true);
    }

    // 채팅방 생성 버튼 클릭 이벤트
    const onRoomCreateIconButtonmClickHandler = () => {
      if (popUpVisible) {
        setPopUpVisible(false);
        setPopUpRoomVisible(false);
      }
      else {
        setPopUpVisible(true);
        setPopUpRoomVisible(false);
      }
   
    }

    // 채팅방 리스트 입장 버튼 클릭 이벤트
    const onRoomListItemClickHandler = (roomNumber: number) => {
      if(popUpRoomVisible) {
        setPopUpRoomVisible(false);
        setPopUpVisible(false);
      }
      else{
        setPopUpRoomVisible(true);
        setPopUpVisible(false);
       
      }
      setSelectRoomNumber(roomNumber);
    }
   
    // effect //
    // 현재 페이지가 바뀔때 마다 Room 리스트 변경//
    useEffect(() => {
      getPageRoomList(currentRoomList);
    }, [currentPage])

    // 현재 섹션이 바뀔때 마다 페이지 리스트 변경 //
    useEffect(() => {
      changeSection(currentRoomList.length, MAIN_ROOM_COUNT_BY_PAGE);
    }, [currentSection]);


    useEffect(() => {
      GetCurrentRoomListRequest(currentSection).then(getCurrnetRoomListResponseHandler);
    }, [currentSection]);

    

    // render //
    return(
      <div className='main-bottom'>
        <div className='main-bottom-title' onClick={ onRoomListButtonClickHandler }>Room</div>
        <div className='main-bottom-top'>
          {(searchIconState) ? (
            <div className='main-bottom-top-search'>
              <input className='main-bottom-top-search-input' placeholder='검색어를 입력해주세요.' />
              <div className='main-bottom-top-search-icon-button' onClick={ onSearchIconButtonClickHandler }></div>
            </div>
          ) : (
            <div className='main-bottom-top-search-icon-only'>
              <div className='main-bottom-top-search-icon-button' onClick={ onSearchIconButtonClickHandler }></div>
            </div>
          )
          }
          <div className='main-bottom-top-create-button' onClick={onRoomCreateIconButtonmClickHandler}>생성</div>
          {popUpVisible && <div className='chat-room-pop-up'><ChatRoomPopUp /></div>}
        </div>
        <div className='main-bottom-bottom'>
          <div className='main-bottom-bottom-top-box'>
            <div className='main-bottom-bottom-plus-button' onClick={ onRoomListButtonClickHandler }></div>
          </div>
          <div className='main-bottom-bottom-list-box'>
            {/* map 함수 돌릴것 3개 */}
            {pageRoomList.map((item) => <><RoomListItem onClick={() => onRoomListItemClickHandler(item.roomNumber)} item={item}/></>)}
            {popUpRoomVisible && <div className='chat-room-pop-up'><ChatComePopUP roomNumber={selectRoomNumber} /></div>}
          </div>
        </div>
        <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPreviousClickHandler={onPreviousClickHandler}
        onNextClickHandler={onNextClickHandler}
        onPageClickHandler={onPageClickHandler}/>
      </div>
    );
  }

  

  // render //
  return (
    <div id='main'>
      <MainTop/>
      <MainMid/>
      <MainBottom/>
    </div>
  );
}
