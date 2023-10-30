import React, {useState, useEffect} from 'react'

import { usePagination } from 'src/hooks';
import { MY_COMPARE_RESULT_BY_PAGE } from 'src/constants';
import Pagination from '../Pagination';
import CompareListResponseDto from 'src/interfaces/response/Compare/compare-list.response.dto';
import "./style.css";

export default function MyCompareCodeList() {

    // 페이지네이션과 관련된 상태 및 함수
    const{totalPage, currentPage, currentSection, onPageClickHandler, onPreviousClickHandler, onNextClickHandler, changeSection} = usePagination();
    // Compare 에 해당하는 전체 리스트 상태
    const[currentMyCompareList, setCurrentMyCompareist] = useState<CompareListResponseDto[]>();
    // Compare 에 해당하는 전체 갯수 상태
    const[compareCount, setCompareCount] = useState<number>(1);
    // Compare 현재 페이지에서 보여줄 Room 게시물 리스트 상태
    const[pageRoomList, setPageRoomList] = useState<CompareListResponseDto[]>([])

const getMyCompareResultList = (compareList : CompareListResponseDto[]) => {
    const startIndex = MY_COMPARE_RESULT_BY_PAGE * (currentPage - 1);
    const lastIndex = compareList.length > MY_COMPARE_RESULT_BY_PAGE * currentPage ?
    MY_COMPARE_RESULT_BY_PAGE * currentPage : compareList.length;
    const pageRoomList = compareList.slice(startIndex, lastIndex);

    setPageRoomList(pageRoomList);
  }

    // 현재 페이지가 바뀔때 마다 Room 리스트 변경//
    useEffect(() => {
        getMyCompareResultList([]);
      }, [currentPage])
  
      // 현재 섹션이 바뀔때 마다 페이지 리스트 변경 //
      useEffect(() => {
        // changeSection(currentMyCompareList.length, MY_COMPARE_RESULT_BY_PAGE);
      }, [currentSection]);

      
  return (
    <div className='main-top'>
        <div className='main-top-title'>My Compare Code</div>
        <div className='main-top-compare'>
            <div className='main-top-compare-box'>
                <div className='main-top-compare-left'>
                <div className='main-top-compare-left-title'>Controll Code</div>
                    <textarea 
                        className='main-top-compare-left-input' 
                        placeholder='텍스트를 입력하거나 파일을 업로드 해주세요. (기준 대상)' 
                    />
                </div>
                <div className='main-top-compare-right'>
                    <div className='main-top-compare-right-title'>Experimental Code</div>
                    <textarea 
                        className='main-top-compare-right-input' 
                        placeholder='텍스트를 입력하거나 파일을 업로드 해주세요. (비교 대상)' 
                    />
                </div>
            </div> 
        </div>
        <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPreviousClickHandler={onPreviousClickHandler}
        onNextClickHandler={onNextClickHandler}
        onPageClickHandler={onPageClickHandler}
        />
    </div>

  )
}
