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
const [boardImageUrl, setBoardImageUrl] = useState<string>('');

//          event handler          //
//description : 제목이 바뀔시 실행될 이벤트 //
const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBoardContent(event.target.value);
}
// description : 본문 내용이 바뀔시 textarea 높이 변경 이벤트 //
const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBoardContent(event.target.value);
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }
// description : 이미지 변경 시 이미지 미리보기 //
const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
    if(!event.target.files || !event.target.files.length) return;
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setBoardImageUrl(imageUrl);
    setBoardImage(event.target.files[0]);
}
//description : 이미지 업로드 버튼 클릭 이벤트 //
const onImageUploadButtonClickHandler = () => {
    if (!fileInputRef.current)return;
    fileInputRef.current.click();
}
// description : 이미지 닫기 버튼 클릭 이벤트 //
const onImageCloseButtonClickHandler = () => {
    if(!fileInputRef.current) return;
    fileInputRef.current.value = '';
    setBoardImageUrl('');
}
//          component          //

//          effect          //

//           render           //
return (
    <div id='board-write-wrapper'>
        <div className='board-write-container'>
            <div className="board-write-title-container">
                <input className="board-write-title-input" type="text" placeholder="게시물 제목을 작성해주세요." onChange={onTitleChangeHandler} value={boardTitle}/>
            </div>   
            <div className="board-image-container">
                <div className="image-upload" onClick={onImageUploadButtonClickHandler}>file</div>
            </div>
            <div className="board-write-content-container">
                <textarea ref={textAreaRef}  className="board-write-content" placeholder="본문을 작성해 주세요. 이미지 파일 업로드도 가능합니다." onChange={onContentChangeHandler} value={boardContent}></textarea>
            </div>
            <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onImageInputChangeHandler} />          
        </div>
        {boardImageUrl && (
            <div className="board-write-image-container">
                <img className="board-write-image" src={boardImageUrl}/>
                <div className="board-write-image-delete-button" onClick={onImageCloseButtonClickHandler}>닫기</div>
            </div>
                )}                   
        <div className="board-button-container">
                 <div className="board-write-button">작성</div>
                 <div className="board-cancle-button">삭제</div>
        </div> 
        
    </div>
    )
}