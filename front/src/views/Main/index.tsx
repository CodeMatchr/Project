import React from 'react';
import './style.css'

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
      <div>

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
