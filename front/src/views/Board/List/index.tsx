import React, { useState, useEffect } from 'react';

import './style.css';
import BoardListResponseDto from 'src/interfaces/response/board/board-list.response.dto';

import BoardListItem from 'src/components/BoardListItem';
import Pagination from 'src/components/Pagination';
import { usePagination } from 'src/hooks';
import ResponseDto from 'src/interfaces/response/response.dto';
import {  COUNT_BY_PAGE, MAIN_ROOM_COUNT_BY_PAGE, MAIN_ROOM_COUNT_BY_PAGE_FUll } from 'src/constants';
import { GetBoardListResponeDto } from 'src/interfaces/response/board';
import { getBoardListCurrentRequest} from 'src/apis';


// component //
export default function BoardList() {

  // state //
  // 페이지네이션 //
  const{totalPage, currentPage, currentSection, onPageClickHandler, onPreviousClickHandler, onNextClickHandler, changeSection} = usePagination();

  // 게시물 리스트 최신 상태 //
  const [currentList, setCurrentList] = useState<BoardListResponseDto[]>([]);

  
  // tap 최신//
  const [currentTap, setCurrentTap] = useState<boolean>(false);
  // tap 조회수//
  const [viewTap, setViewTap] = useState<boolean>(false);
  // tap 좋아요//
  const [favoriteTap, setFavoriteTap] = useState<boolean>(false);
  // tap 댓글//
  const [commentTap, setCommentTap] = useState<boolean>(false);




  // 현재 페이지에서 보여줄 board 리스트 상태 //
  const [viewBoardList, setViewBoardList] = useState<BoardListResponseDto[]>([]);
  // 페이지네이션 함수 //
  const getViewBoardList = (boardList : BoardListResponseDto[]) => {
  const startIndex = MAIN_ROOM_COUNT_BY_PAGE_FUll * (currentPage -1);
  const lastIndex = boardList.length > MAIN_ROOM_COUNT_BY_PAGE_FUll * currentPage ? 
                    MAIN_ROOM_COUNT_BY_PAGE_FUll * currentPage : boardList.length;
  const viewBoardList = boardList.slice(startIndex, lastIndex);
  setViewBoardList(viewBoardList);
}

  //function //
  // 게시물 최신순 리스트 불러오기 응답처리 함수 //
  const getCurrentBoardListResponseHandler = (responseBody: GetBoardListResponeDto | ResponseDto) => {
    const { code } = responseBody;
    if (code === 'VF') alert('섹션이 잘못되었습니다.');
    if (code === 'DE') alert('데이터베이스 에러입니다.');
    if (code !== 'SU') return;

    const { boardList } = responseBody as GetBoardListResponeDto;
    changeSection(boardList.length, COUNT_BY_PAGE);
    setCurrentList(boardList);
    getViewBoardList(boardList);
  }
  // event handler //
  // 최신 tap 클릭 이벤트 //
  const onCurrentClickHandler = () => {
    if(currentTap) return;
    
  }
  // 조회수 tap 클릭 이벤트 //
  const onViewClickHandler = () => {
    if(viewTap) return;
    
  }
  // 좋아요 tap 클릭 이벤트 //
  const onFavoriteClickHandler = () => {
    if(favoriteTap) return;
    
  }
  // 댓글 tap 클릭 이벤트 //
  const onCommentClickHandler = () => {
    if(commentTap) return;
    
  }



  // 현재 페이지가 바뀔 때마다 board 리스트 변경 //
  useEffect(() => {
    getViewBoardList(currentList);
  }, [currentPage]);
  // 현재 섹션이 바뀔 때마다 board 리스트 변경 //
  useEffect(() => {
    getBoardListCurrentRequest(currentSection).then(getCurrentBoardListResponseHandler);
  }, [currentSection]);

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
      {viewBoardList.map((item) => (<BoardListItem item={item} />))}
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
