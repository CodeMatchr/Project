import React from 'react';

import './style.css';

// 페이지네이션 //
// 1. 전체 데이터를 가지고 있을 때 //
// 2. 해당 페이지의 데이터만 가지고 있을 때 //
//    게시물 리스트(Mock) / 현재 페이지 / 전체 페이지 에 대해 알고 있어야 함 //

interface Props{
    totalPage: number[];
    currentPage : number;
    onPageClickHandler : (page: number) => void;
    onPreviousClickHandler : () => void;
    onNextClickHandler : () => void;
}

export default function Pagination({ totalPage, currentPage, onPreviousClickHandler, onNextClickHandler, onPageClickHandler }: Props) {

  
    return (
        <div className='pagination'>
            <div className="pagination-button" onClick={onPreviousClickHandler}>
               <div className="pagination-left-icon"></div>
               <div className="pagination-button-text">이전</div>
               </div>
               <div className="pagination-text">{`\|`}</div>
               { totalPage.map((page) => (<div className={currentPage === page ? 'pagination-page-active' : 'pagination-page'} onClick={() => onPageClickHandler(page)}>{page}</div>)) }
               <div className="pagination-text">{`\|`}</div>
               <div className="pagination-button" onClick={onNextClickHandler}>
               <div className="pagination-button-text">다음</div>
               <div className="pagination-right-icon"></div>
               </div>
        </div>
    )
}
