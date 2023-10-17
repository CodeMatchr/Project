import React, { useEffect, useRef, useState } from 'react';
import './style.css'
import Pagination from '../../components/Pagination';
import BoardListResponseDto from '../../interfaces/response/board/board-list.response.dto';
import Top3ListItem from '../../components/Top3ListItem';
import { top3CommentBoardListMock, top3FavoriteBoardListMock, top3ViewBoardListMock, roomListMock } from '../../mocks';
import RoomListResponseDto from '../../interfaces/response/room/room-list.response.dto';
import RoomListItem from '../../components/RoomListItem';
import { usePagination } from '../../hooks';
import { BOARD_PATH, MAIN_ROOM_COUNT_BY_PAGE, ROOM_PATH } from '../../constants';
import { useNavigate } from 'react-router-dom';
import ChatRoomPopUp from '../../components/PopUp/ChatRoomPopUp';
import ChatComePopUP from '../../components/PopUp/ChatComePopUp';

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
    // // description :  요소에 대한 참조 상태 Controll Group (왼쪽) //
    // const textLeftAreaRef = useRef<HTMLTextAreaElement>(null);
    // // description :  요소에 대한 참조 상태 Experimental Group (오른쪽) //
    // const textRightAreaRef = useRef<HTMLTextAreaElement>(null);

    // Controll Group (왼쪽)
    const [leftText, setLeftText] = useState<string>('');
    // Experimental Group (오른쪽)
    const [rightText, setRightText] = useState<string>('');

    // description : file input 요소에 대한 참조 상태 //
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 비교 분석 결과 정보를 저장할 상태


    // function //
    

    // event handler //
    const compareButtonClickHandler = () => {
      if(leftText.trim() === "" && rightText.trim() === "") {
        alert("텍스트를 입력해주세요.");
      } else if (leftText.trim() === "") {
        alert("기준이 되는 텍스트를 입력해주세요.");
      } else if (rightText.trim() === "") {
        alert("비교하려는 텍스트를 입력해 주세요.");
      } else if (leftText === rightText) {
        alert("두 텍스트들이 서로 일치합니다");
      } else {
        alert("두 텍스트들이 서로 일치하지 않습니다.");
      }
    }

    const resetButtonClickHandler = () => {
      setLeftText('');
      setRightText('');
    }

    const switchButtonClickHandler = () => {
      setLeftText(rightText);
      setRightText(leftText);
    }
    

    // effect //

    // render //
    return(
      <div className='main-top'>
        <div className='main-top-title'>Compare Code</div>
        <div className='main-top-compare'>
          <div className='main-top-compare-left'>
            <div className='main-top-compare-left-title'>Controll Code</div>
            <textarea className='main-top-compare-left-input' placeholder='텍스트를 입력하거나 파일을 업로드 해주세요. (기준 대상)' value={leftText} onChange={(e) => setLeftText(e.target.value)}/>
          </div>
          <div className='main-top-compare-switch-button' onClick={switchButtonClickHandler}></div>
          <div className='main-top-compare-right'>
            <div className='main-top-compare-right-title'>Experimental Code</div>
            <textarea className='main-top-compare-right-input' placeholder='텍스트를 입력하거나 파일을 업로드 해주세요. (비교 대상)' value={rightText} onChange={(e) => setRightText(e.target.value)} />
          </div>
        </div>
        <div className='main-top-compare-result'>
          <div className='main-top-compare-result-button' onClick={compareButtonClickHandler}>compare</div>
          <div className='main-top-compare-result-save-button'>save</div>
        </div>
      </div>
    );
  }

  // component //
  // Main Mid - Top3 Board 컴포넌트 //
  const MainMid = () => {

    // state //
    // Top3 에 해당하는 Board 리스트 상태 (View(default), Favorite, Comment) //
    const[currentTop3BoardList, setCurrentTop3BoardList] = useState<BoardListResponseDto[]>(top3ViewBoardListMock);
    // Top3 조회수 Board 리스트 Tab 버튼 클릭 상태 //
    const[top3ViewBoardListTabState, setTop3ViewBoardListTabState] = useState<boolean>(true);
    // Top3 좋아요 수 Board 리스트 Tab 버튼 클릭 상태 //
    const[top3FavoriteBoardListTabState, setTop3FavoriteBoardListTabState] = useState<boolean>(false);
    // Top3 댓글수 Board 리스트 Tab 버튼 클릭 상태 //
    const[top3CommentBoardListTabState, setTop3CommentBoardListTabState] = useState<boolean>(false);



    // function //

    // event handler //
    // Board 리스트 페이지 이동 버튼 클릭 이벤트 //
    const onBoardListClickHandler = () => {
      navigator(BOARD_PATH);
    }

    // Top3 조회수 Board 리스트 Tab 버튼 클릭 이벤트 //
    const onTop3ViewBoardListTabClickHandler = () => {
      if (!top3ViewBoardListTabState) {
        setTop3ViewBoardListTabState(true);
        setTop3FavoriteBoardListTabState(false);
        setTop3CommentBoardListTabState(false);
        setCurrentTop3BoardList(top3ViewBoardListMock);
      }
      
    }

    // Top3 좋아요 수 Board 리스트 Tab 버튼 클릭 이벤트 //
    const onTop3FavoriteBoardListTabClickHandler = () => {
      if (!top3FavoriteBoardListTabState) {
        setTop3FavoriteBoardListTabState(true);
        setTop3ViewBoardListTabState(false);
        setTop3CommentBoardListTabState(false);
        setCurrentTop3BoardList(top3FavoriteBoardListMock);
      }
    }

    // Top3 댓글수 Board 리스트 Tab 버튼 클릭 이벤트 //
    const onTop3CommentBoardListTabClickHandler = () => {
      if (!top3CommentBoardListTabState) {
        setTop3CommentBoardListTabState(true);
        setTop3ViewBoardListTabState(false);
        setTop3FavoriteBoardListTabState(false);
        setCurrentTop3BoardList(top3CommentBoardListMock);
      }
      
    }

    // effect //

    // render //
    return(
      <div className='main-mid'>
        <div className='main-mid-title' onClick={ onBoardListClickHandler }>TOP 3 Board</div>
        <div className='main-mid-top3-board'>
          <div className='main-mid-top3-board-tab'>
            <div className='main-mid-top3-board-tab-view-count-button' onClick={ onTop3ViewBoardListTabClickHandler } style={{ backgroundColor: top3ViewBoardListTabState ? "gray" : "white" }}>조회수</div>
            <div className='main-mid-top3-board-tab-favorite-count-button' onClick={ onTop3FavoriteBoardListTabClickHandler } style={{ backgroundColor: top3FavoriteBoardListTabState ? "gray" : "white" }}>좋아요 수</div>
            <div className='main-mid-top3-board-tab-comment-count-button' onClick={ onTop3CommentBoardListTabClickHandler } style={{ backgroundColor: top3CommentBoardListTabState ? "gray" : "white" }}>댓글 수</div>
          </div>
          <div className='main-mid-top3-board-list'>
            <div className='main-mid-top3-board-list-top'>
              <div className='main-mid-top3-board-list-top-title'>조회수 TOP 3</div>
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
    const{totalPage, currentPage, currentSection, onPageClickHandler, onPreviousClickHandler, onNextClickHandler, changeSection} = usePagination();
    // Room 에 해당하는 전체 리스트 상태
    const[currentRoomList, setCurrentRoomList] = useState<RoomListResponseDto[]>(roomListMock);
    // Room 에 해당하는 전체 갯수 상태
    const[roomCount, setRoomCount] = useState<number>(1);
    // Room 현재 페이지에서 보여줄 Room 게시물 리스트 상태
    const[pageRoomList, setPageRoomList] = useState<RoomListResponseDto[]>([])
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
    const getPageRoomList = (roomList : RoomListResponseDto[]) => {
      const startIndex = MAIN_ROOM_COUNT_BY_PAGE * (currentPage - 1);
      const lastIndex = roomList.length > MAIN_ROOM_COUNT_BY_PAGE * currentPage ?
        MAIN_ROOM_COUNT_BY_PAGE * currentPage : roomList.length;
      const pageRoomList = roomList.slice(startIndex, lastIndex);

      setPageRoomList(pageRoomList);
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
