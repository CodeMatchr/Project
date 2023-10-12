import React, {ChangeEvent , useRef , useState}  from "react"

import { useBoardWriteStore } from "../../../store";

import './style.css';

//     component      //
// description : 게시물 쓰기 화면 //
export default function BoardWrite() {

//          state          //
// description : textarea 요소에 대한 참조 상태 //
const textAreaRef = useRef<HTMLTextAreaElement>(null);
// description : file input 요소에 대한 참조 상태 //
const fileInputRef = useRef<HTMLInputElement>(null);
// description : 게시물 정보를 저장할 상태 //
const { boardTitle , boardContent , boardImage , setBoardTitle , setBoardContent , setBoardImage} = useBoardWriteStore();
// description : 이미지 저장할 상태 //
//          event handler          //
//description : 제목이 바뀔시 실행될 이벤트 //
const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

}
//          component          //

//          effect          //

//           render           //
return (
    <div id='board-write-wrapper'>
        <div className='board-write-container'>
            <div className="board-write-title-container">
                <input className="board-write-title-input" type="text" placeholder="게시물 제목을 작성해주세요."/>
            </div>
            <div className="board-write-content-container">
                <textarea className="board-write-content" placeholder="본문을 작성해 주세요. 이미지 파일 업로드도 가능합니다."></textarea>
            </div>

           
        </div>
        <div className="board-button-container">
                 <div className="board-write-button">작성</div>
                 <div className="board-cancle-button">삭제</div>
        </div> 

    </div>
    )
}