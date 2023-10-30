import { useState } from 'react';
import { getPagination } from '../utils';


// hook //
// 페이지네이션 관련 상태관리 훅 함수 //
const usePagination = () => {

     // 현재 페이지 상태 //
     const [currentPage, setCurrentPage] = useState<number>(1);
     // 현재 섹션 상태 //
     const [currentSection, setCurrentSection] = useState<number>(1);
     // 한 섹션에 표시될 페이지 리스트 상태 //
     const [totalPage, setTotalPage] = useState<number[]>([]);
     // 전체 섹션 상태 //
     const [totalSection, setTotalSection] = useState<number>(1);
     // 전체 페이지 수 상태 //
     const [totalPageCount, setTotalPageCount] = useState<number>(0);
     // 한 섹션에 최고 페이지 상태 //
     const [minPage, setMinPage] = useState<number>(0);
     // 한 섹션에 최저 페이지 상태 //
     const [maxPage, setMaxPage] = useState<number>(0);
     

     // 페이지 클릭 이벤트 //
     const onPageClickHandler = (page : number) => {
          setCurrentPage(page);
     }
     // 이전 버튼 클릭 이벤트 //
     const onPreviousClickHandler = () => {  
          // 한 페이지씩 이동 + 섹션 이동
          if(currentPage == 1) return;
          if(currentPage == minPage) setCurrentSection(currentSection - 1);
          setCurrentPage(currentPage - 1);
     }
    // 다음 버튼 클릭 이벤트 //
     const onNextClickHandler = () => {
          // 한 페이지씩 이동 + 섹션 이동
          if(currentPage == totalPageCount) return;
          if(currentPage == maxPage) setCurrentSection(currentSection + 1);
          setCurrentPage(currentPage + 1);
     }

     // 현재 섹션이 변경될 때 호출할 함수 //
     const changeSection = (roomCount: number, countByPage: number) => {
          const { section, minPage, maxPage, totalPageCount } = getPagination(roomCount, currentSection, countByPage);
          
          setMinPage(minPage);
          setMaxPage(maxPage);
          setTotalSection(section);
          setTotalPageCount(totalPageCount);
          
          const pageList = [];
          for(let page = minPage; page <= maxPage; page++) pageList.push(page);
          setTotalPage(pageList);
     }

     return {totalPage, currentPage, currentSection, onPageClickHandler, onPreviousClickHandler, onNextClickHandler, changeSection};
}

export default usePagination;
