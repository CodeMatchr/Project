import React, { ChangeEvent, useRef, useState ,useEffect } from 'react'
import './style.css';
import { useBoardWriteStore } from '../../../store';
import { useLocation, useNavigate, useParams  } from 'react-router-dom';
import ResponseDto from '../../../interfaces/response/response.dto';
import GetBoardResponseDto from '../../../interfaces/response/board/get-board.response.dto';
import { BOARD_DETAIL_PATH, MAIN_PATH, UPDATE_PATH } from '../../../constants';
import { getBoardRequest, patchBoardRequest, uploadFileRequest } from 'src/apis';
import { access } from 'fs';
import { useCookies } from 'react-cookie';
import { PatchBoardRequestDto } from 'src/interfaces/request/board';

//         component         //
//description : 게시물 수정 화면//
export default function BoardUpdate() {

//          state          //
// description : textarea 요소에 대한 참조 상태 //
const textAreaRef = useRef<HTMLTextAreaElement>(null);
// description : file input 요소에 대한 참조 상태 //
const fileInputRef = useRef<HTMLInputElement>(null);
// description : 게시물 정보를 저장할 상태 //
const { boardTitle , boardContents , boardImageUrl } = useBoardWriteStore();
const { setBoardNumber, setBoardTitle, setBoardContents, setBoardImage, setBoardImageUrl, resetBoard } = useBoardWriteStore();
// description : 게시물 번호 상태 //
const {boardNumber} = useParams();

const [cookies, setCookie] = useCookies();

const {pathname} = useLocation();

//           function          //
const navigator = useNavigate();
// 파일 업로드 //
const fileUpload = async () => {
    if (boardImageUrl === null) return null;

    const data = new FormData();
    data.append('file', boardImageUrl);

    const imageUrl = await uploadFileRequest(data);
    return imageUrl;
  }


// description : 게시물 불러오기 //
const getBoardResponseHandler = (responseBody : GetBoardResponseDto | ResponseDto) => {
    const {code} = responseBody;

    if (code === 'NE') alert('존재하지 않는 사용자 이메일입니다.');
    if (code === 'VF') alert('잘못된 게시물 번호입니다.');
    if (code === 'DE') alert('데이터베이스 에러입니다.');
    if (code !== 'SU') {
      navigator(MAIN_PATH);
      return;
    }

    const { boardTitle , boardContents , boardImageUrl} = responseBody as GetBoardResponseDto
    setBoardTitle(boardTitle);
    setBoardContents(boardContents);
    setBoardImageUrl(boardImageUrl);

}
// description: 게시물 수정 함수 //
const patchBoardResponseHandler = (code: string) => {
    if (code === 'NE') alert('존재하지 않는 사용자 이메일입니다.');
    if (code === 'NB') alert('존재하지 않는 게시물 번호입니다.');
    if (code === 'NP') alert('권한이 없습니다.');
    if (code === 'VF') alert('필수 데이터를 입력하지 않았습니다.');
    if (code === 'DE') alert('데이터베이스 에러입니다.');
    if (code !== 'SU') return;
    
    resetBoard();
    
    if (!boardNumber) return;
    navigator(BOARD_DETAIL_PATH(boardNumber));
    }
//          event handler          //
// 취소 버튼 //
const onCancelClickHandler = () => {
    navigator(MAIN_PATH);
}

// 수정 버튼 클릭 //
const onBoardUpdateButtonClickHandler = async () => {

    const token = cookies.accessToken;

    if (!boardNumber) return;

      const imageUrl = boardImageUrl ? await fileUpload() : boardImageUrl;

      const data: PatchBoardRequestDto = {
        boardTitle: boardTitle,
        boardContents: boardContents,
        boardImageUrl: imageUrl
      }
      patchBoardRequest(boardNumber, data, token).then(patchBoardResponseHandler);
    }


//description : 제목이 바뀔시 실행될 이벤트 //
const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(event.target.value);
}
// description : 본문 내용이 바뀔시 textarea 높이 변경 이벤트 //
const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBoardContents(event.target.value);
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
// 수정버튼 클릭 후 수정 안하고 메인 -> 글쓰기 하면 내용이 남아있는거 리셋하는 작업 //
useEffect(() => {
    resetBoard();
  }, []);
// 게시물 불러오기 //
useEffect(() => {
    if(!boardNumber) {
        alert('게시물번호가 잘못되었습니다.');
        navigator(MAIN_PATH);
        return;
    }
    getBoardRequest(boardNumber).then(getBoardResponseHandler);
},[boardNumber]);
//           render           //
return (
    <div id='board-write-wrapper'>
        <div className='board-write-container'>
            <div className="board-write-title-container">
                <input className="board-write-title-input" type="text" placeholder="게시물 제목을 수정해주세요." onChange={onTitleChangeHandler} value={boardTitle}/>
            </div>   
            <div className="board-image-container">
                <div className="image-upload" onClick={onImageUploadButtonClickHandler}>file</div>
            </div>
            <div className="board-write-content-container">
                <textarea ref={textAreaRef}  className="board-write-content" placeholder="본문을 수정해 주세요. 이미지 파일 업로드도 가능합니다." onChange={onContentChangeHandler} value={boardContents}></textarea>
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
                 <div className="board-write-button" onClick={onBoardUpdateButtonClickHandler} >수정</div>
                 <div className="board-cancle-button" onClick={onCancelClickHandler}>취소</div>
        </div> 
    </div>
    )
}