import React, {ChangeEvent , useRef , useState, useEffect}  from "react"

import { useBoardWriteStore, useUserStore } from "../../../store";

import './style.css';
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BOARD_DETAIL_PATH, BOARD_NUMBER_PATH_VARIABLE, BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PAGE_PATH_VARIABLE, USER_PATH, WRITE_PATH } from "src/constants";
import PostBoardRequestDto from "src/interfaces/request/board/post-board.request.dto";
import { patchBoardRequest, postBoardRequest, uploadFileRequest } from "src/apis";
import PatchBoardRequestDto from "src/interfaces/request/board/patch-board.request.dto";

//     component      //
// description : 게시물 쓰기 화면 //
export default function BoardWrite() {

//          state          //
// description : textarea 요소에 대한 참조 상태 //
const textAreaRef = useRef<HTMLTextAreaElement>(null);
// description : file input 요소에 대한 참조 상태 //
const fileInputRef = useRef<HTMLInputElement>(null);
// description : 게시물 정보를 저장할 상태 //
const { boardNumber, boardTitle , boardContent , boardImage , setBoardTitle , setBoardContent , setBoardImage, resetBoard} = useBoardWriteStore();
// description : 이미지 저장할 상태 //
const [boardImageUrl, setBoardImageUrl] = useState<string>('');
// Cookies 상태 //
const [cookies, setCookie] = useCookies();
// navigator //
const navigator = useNavigate();
// 로그인 유저 정보 상태 //
const { user, setUser } = useUserStore();
// description: url 경로 상태 //
const { pathname } = useLocation();

//          function          //
// 파일 업로드 //
const fileUpload = async () => {
    if (boardImage === null) return null;

    const data = new FormData();
    data.append('file', boardImage);

    const imageUrl = await uploadFileRequest(data);
    return imageUrl;
  }

// 취소 버튼 //
const onCancelClickHandler = () => {
    navigator(MAIN_PATH);
}
// description: 게시물 작성 함수 //
const postBoardResponseHandler = (code: string) => {
    if (code === 'NE') alert('존재하지 않는 사용자 이메일입니다.');
    if (code === 'VF') alert('필수 데이터를 입력하지 않았습니다.');
    if (code === 'DE') alert('데이터베이스 에러입니다.');
    if (code !== 'SU') return;

    resetBoard();

    if (!user) return;
    navigator(USER_PATH(user.userEmail));
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
//description : 제목이 바뀔시 실행될 이벤트 //
const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(event.target.value);
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

// 작성 버튼 클릭 이벤트 //
const onBoardWriteButtonClickHandler = async () => {

    const token = cookies.accessToken;

    if (pathname === WRITE_PATH) {
      const imageUrl = await fileUpload();

      const data: PostBoardRequestDto = {
        boardTitle: boardTitle,
        boardContents: boardContent,
        boardImageUrl :imageUrl
      }
      postBoardRequest(data, token).then(postBoardResponseHandler);
    } 
    else {
      if (!boardNumber) return;

      const imageUrl = boardImage ? await fileUpload() : boardImageUrl;

      const data: PatchBoardRequestDto = {
        boardTitle: boardTitle,
        boardContents: boardContent,
        boardImageUrl :imageUrl
      }
      patchBoardRequest(boardNumber, data, token).then(patchBoardResponseHandler);
    }
    
  }

 
//          component          //

//          effect          //
// 리셋 게시물 //
useEffect(() => {
    resetBoard();
  }, []);

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
                 <div className="board-write-button" onClick={onBoardWriteButtonClickHandler} >작성</div>
                 <div className="board-cancle-button" onClick={onCancelClickHandler}>취소</div>
        </div> 
        
    </div>
    )
}