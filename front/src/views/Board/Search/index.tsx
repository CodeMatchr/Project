import React, { useState, useEffect } from 'react';

import './style.css';
import BoardListResponseDto from 'src/interfaces/response/board/board-list.response.dto';

import BoardListItem from 'src/components/BoardListItem';
import Pagination from 'src/components/Pagination';
import { usePagination } from 'src/hooks';
import ResponseDto from 'src/interfaces/response/response.dto';
import {  MAIN_PATH, MAIN_ROOM_COUNT_BY_PAGE_FUll } from 'src/constants';
import {  getSearchBoardRequest} from 'src/apis';
import GetSearchBoardResponseDto from 'src/interfaces/response/board/get-search-board.response.dto';
import { useNavigate, useParams } from 'react-router-dom';


// component //
export default function SearchList() {

  // state //
  // 페이지네이션 //
  const{totalPage, currentPage, currentSection, onPageClickHandler, onPreviousClickHandler, onNextClickHandler, changeSection} = usePagination();

  // 전체 게시물 리스트 //
  const [searchList, setSearchList] = useState<BoardListResponseDto[]>([]);

  // 현재 페이지에서 보여줄 board 리스트 상태 //
  const [viewBoardList, setViewBoardList] = useState<BoardListResponseDto[]>([]);

  // 게시물 수 //
  const [boardCount, setBoardCount] = useState<number>(0);

  // 검색어 //
  const {searchWord} = useParams();

  const navigator = useNavigate();



  //function //
  
  // 페이지네이션 함수 //
  const getViewBoardList = (boardList : BoardListResponseDto[]) => {
  const startIndex = MAIN_ROOM_COUNT_BY_PAGE_FUll * (currentPage -1);
  const lastIndex = boardList.length > MAIN_ROOM_COUNT_BY_PAGE_FUll * currentPage ? 
                    MAIN_ROOM_COUNT_BY_PAGE_FUll * currentPage : boardList.length;
  const viewBoardList = boardList.slice(startIndex, lastIndex);

  setViewBoardList(viewBoardList);
}

  // 검색 결과 응답 처리 함수 //
  const getSearchBoardListRespnseHandler = (responseBody : GetSearchBoardResponseDto | ResponseDto) => {

    const {code} = responseBody;
    if(code === 'VF') alert('잘못된 입력입니다.');
    if(code === 'DE') alert('데이터 베이스 오류입니다.');
    if(code !== 'SU') return;

    const {boardList} = responseBody as GetSearchBoardResponseDto;
    setSearchList(boardList);
    setBoardCount(boardList.length);
    getViewBoardList(boardList);
    changeSection(boardList.length, MAIN_ROOM_COUNT_BY_PAGE_FUll);
    
  }
   
  // event handler //
  

  // effect //
  useEffect (() => {
    if(!searchWord) {
      alert('검색어가 올바르지 않습니다. 다시 확인해주세요.');
      navigator(MAIN_PATH);
      return;
    }
    getSearchBoardRequest(searchWord).then(getSearchBoardListRespnseHandler);

  }, [searchWord]);


  // 현재 페이지가 바뀔 때마다 board 리스트 변경 //
  useEffect(() => {
    getViewBoardList(searchList);
  }, [currentPage]);
  // 섹션이 바뀌면 랜더링 //
  useEffect(() => {
    changeSection(boardCount, MAIN_ROOM_COUNT_BY_PAGE_FUll);
  }, [currentSection]);

 
  return (
    <div className='board-full-list'>
      <div className='board-full-list-top'>
        <div className='board-full-list-top-title'>검색 게시물</div>
        <div className='board-full-list-top-button-box'>
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
