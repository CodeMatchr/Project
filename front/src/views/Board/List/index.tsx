import React, { useState } from 'react';

import './style.css';
import BoardListResponseDto from 'src/interfaces/response/board/board-list.response.dto';

import BoardListItem from 'src/components/BoardListItem';
import Pagination from 'src/components/Pagination';
import { usePagination } from 'src/hooks';


// component //
export default function BoardList() {

  // state //
  const[currentBoardFullList, setCurrentBoardFullList] = useState<BoardListResponseDto[]>([]);

  const{totalPage, currentPage, currentSection, onPageClickHandler, onPreviousClickHandler, onNextClickHandler, changeSection} = usePagination();


  return (
    <div className='board-full-list'>
      <div className='board-full-list-top'>
        <div className='board-full-list-top-title'>Board OO순</div>
        <div className='board-full-list-top-button-box'>
          <div className='board-recent-button'>최신순</div>
          <div className='board-view-button'>조회수</div>
          <div className='board-favorite-button'>좋아요 수</div>
          <div className='board-comment-button'>댓글 수</div>
        </div>
      </div>

      <div className='board-full-list-box'>
        {currentBoardFullList.map((item) => (<BoardListItem item={item}/>))}
        {/* 컴포넌트로 따로 빼면 Mock 데이터 없어서 아무것도 안나와서 만들때는 밑의 주석으로 만들어서 CSS 입혀서 컴포넌트로 넣었어요 -> BoardListItem */}
        {/* <div className='board-list'>
          <div className='board-list-left-image'></div>
          <div className='board-list-mid'>
            <div className='board-list-mid-top'>
              <div className='board-title'>제목</div>
              <div className='board-contents'>내용</div>
              <div className='board-write-datetime'>작성일자</div>
            </div>
            <div className='board-list-mid-bottom'>
              <div className='board-count'>조회수</div>
              <div className='board-favorite'>좋아요 수</div>
              <div className='board-comment'>댓글 수</div>
            </div>
          </div>
          <div className='board-list-right'>
            <div className='board-writer-profile'></div>
            <div className='board-writer-nickname'>닉네임</div>
          </div>
        </div> */}
      </div>
      <Pagination
      totalPage={totalPage}
      currentPage={currentPage}
      onPreviousClickHandler={onPreviousClickHandler}
      onNextClickHandler={onNextClickHandler}
      onPageClickHandler={onPageClickHandler} />
      
    </div>
  )
}
