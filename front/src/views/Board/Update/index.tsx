import React from 'react'
import './style.css';

//         component         //
//description : 게시물 수정 화면//
export default function BoardUpdate() {

//          state          //
//          event handler          //

//          component          //

//          effect          //

//           render           //
return (
    <div id='board-write-wrapper'>
        <div className='board-write-container'>
            <div className="board-write-title-container">
                <input className="board-write-title-input" type="text" placeholder="게시물 제목을 작성했습니다.."/>
            </div>
            <div className="board-write-content-container">
                <textarea className="board-write-content" placeholder="게시글 내용을 작성했습니다."></textarea>
            </div>
           
        </div>
        <div className="board-button-container">
                 <div className="board-write-button">작성</div>
                 <div className="board-cancle-button">삭제</div>
        </div>                
    </div>
    )
}
