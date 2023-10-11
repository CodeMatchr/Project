import React from 'react';

import './style.css';

interface Props{
    totalPage: number[];
    currentPage : number;
    onPageClickHandler : (page: number) => void;
    onPreviousClickHandler : () => void;
    onNextClickHandler : () => void;
}

// component //
export default function Pagination({ totalPage, currentPage, onPreviousClickHandler, onNextClickHandler, onPageClickHandler }: Props) {

    // state //

    // function //

    // event handler //

    // effect //

    // render //
    return (
        <div className='pagination'>
            <div className="pagination-button" onClick={onPreviousClickHandler}>
               <div className="pagination-left-icon">*</div>
               <div className="pagination-button-text">이전</div>
               </div>
               <div className="pagination-text">{`\|`}</div>
               { totalPage.map((page) => (<div className={currentPage === page ? 'pagination-page-active' : 'pagination-page'} onClick={() => onPageClickHandler(page)}>{page}</div>)) }
               <div className="pagination-text">{`\|`}</div>
               <div className="pagination-button" onClick={onNextClickHandler}>
               <div className="pagination-button-text">다음</div>
               <div className="pagination-right-icon">*</div>
               </div>
        </div>
    )
}
