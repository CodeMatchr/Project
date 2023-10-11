import React, { useState } from 'react';
import './style.css'
import Pagination from '../../components/Pagination';
import BoardListResponseDto from '../../interfaces/response/board/board-list.response.dto';
import Top3ListItem from '../../components/Top3ListItem';
import { top3ViewBoardListMock } from '../../mocks';

// component //

export default function Main() {

  // state //

  // function //

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
      <div className='main-top'>
        <div className='main-top-title'>Compare Code</div>
        <div className='main-top-compare'>
          <div className='main-top-compare-left'>
            <div className='main-top-compare-left-title'>Controll Code</div>
            <input className='main-top-compare-left-input' placeholder='텍스트를 입력하거나 파일을 업로드 해주세요. (기준 대상)' />
          </div>
          <div className='main-top-compare-switch-button'>icon</div>
          <div className='main-top-compare-right'>
            <div className='main-top-compare-right-title'>Experimental Code</div>
            <input className='main-top-compare-right-input' placeholder='텍스트를 입력하거나 파일을 업로드 해주세요. (비교 대상)' />
          </div>
        </div>
        <div className='main-top-compare-result'>
          <div className='main-top-compare-result-button'>compare</div>
          <div className='main-top-compare-result-save-button'>save</div>
        </div>
      </div>
    );
  }

  // component //
  // Main Mid - Top3 Board 컴포넌트 //
  const MainMid = () => {

    // state //
    // Top3 조회수 Board 리스트 상태 //
    const[top3ViewBoardList, setTop3ViewBoardList] = useState<BoardListResponseDto[]>(top3ViewBoardListMock);

    // function //

    // event handler //

    // effect //

    // render //
    return(
      <div className='main-mid'>
        <div className='main-mid-title'>TOP 3 Board</div>
        <div className='main-mid-top3-board'>
          <div className='main-mid-top3-board-tab'>
            <div className='main-mid-top3-board-tab-view-count-button'>조회수</div>
            <div className='main-mid-top3-board-tab-favorite-count-button'>좋아요 수</div>
            <div className='main-mid-top3-board-tab-comment-count-button'>댓글 수</div>
          </div>
          <div className='main-mid-top3-board-list'>
            <div className='main-mid-top3-board-list-top'>
              <div className='main-mid-top3-board-list-top-title'>조회수 TOP 3</div>
              <div className='main-mid-top3-board-list-top-plus-button'>icon</div>
            </div>
            <div className='main-mid-top3-board-list-bottom'>
              {/* map 함수로 돌릴것 3개씩 */}
              {top3ViewBoardList.map((item) => (<Top3ListItem item={item}/>))}
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

    // function //

    // event handler //

    // effect //

    // render //
    return(
      <div className='main-bottom'>
        <div className='main-bottom-title'>Room</div>
        <div className='main-bottom-top'>
          <div className='main-bottom-top-search'>
            {/* <input className='main-bottom-top-search-input' /> */}
            <div className='main-bottom-top-search-icon-button'>icon</div>
          </div>
          <div className='main-bottom-top-create-button'>생성</div>
        </div>
        <div className='main-bottom-bottom'>
          <div className='main-bottom-bottom-plus-button'>icon</div>
          <div className='main-bottom-bottom-list-box'>
            {/* map 함수 돌릴것 3개 */}
            <div className='main-bottom-bottom-list-room'>
              <div className='main-bottom-bottom-list-room-profile'>이미지</div>
              <div className='main-bottom-bottom-list-room-title'>채팅방 제목</div>
              <div className='main-bottom-bottom-list-room-manager-nickname'>방장 닉네임</div>
              <div className='main-bottom-bottom-list-room-member-count'>채팅방 인원수</div>
            </div>
            <div className='main-bottom-bottom-list-room'>
              <div className='main-bottom-bottom-list-room-profile'>이미지</div>
              <div className='main-bottom-bottom-list-room-title'>채팅방 제목</div>
              <div className='main-bottom-bottom-list-room-manager-nickname'>방장 닉네임</div>
              <div className='main-bottom-bottom-list-room-member-count'>채팅방 인원수</div>
            </div>
            <div className='main-bottom-bottom-list-room'>
              <div className='main-bottom-bottom-list-room-profile'>이미지</div>
              <div className='main-bottom-bottom-list-room-title'>채팅방 제목</div>
              <div className='main-bottom-bottom-list-room-manager-nickname'>방장 닉네임</div>
              <div className='main-bottom-bottom-list-room-member-count'>채팅방 인원수</div>
            </div>
            {/* <div className='main-bottom-bottom-list-room'>

            </div>
            <div className='main-bottom-bottom-list-room'>

            </div> */}
          </div>
        </div>
        {/* <Pagination/> */}
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
