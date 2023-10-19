import React, {useEffect, useState} from 'react'
import './style.css';
import BoardListResponseDto from '../../interfaces/response/board/board-list.response.dto';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_PATH, MAIN_PATH } from '../../constants';
import GetBoardResponseDto from 'src/interfaces/response/board/get-board.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import { getBoardRequest } from 'src/apis';



interface Props {
    item: BoardListResponseDto;
  }

//                      component                       //
export default function UserBoardItem({item} :Props) {

//                      state                       //
// description : 네비게이터 함수 //
const navigator = useNavigate();

// description: 속성으로 받아오는 게시물 관련 상태 //
const { boardNumber, boardTitle, boardContents, boardImageUrl } = item;
const { boardWriterProfileImageUrl, boardWriterNickname, boardWriteDatetime } = item;
const { boardFavoriteCount, boardCommentCount, boardViewCount } = item;

// description : 이미지 상태 //
const roomImageBackground = boardWriterProfileImageUrl ? {backgroundImage : `url(${boardImageUrl})`} : { backgroundColor : 'rgba(0, 0, 0, 0.6)' };

// 게시물 정보 상태 //
const [board, setBoard] = useState<GetBoardResponseDto | null>(null);

//                      function                       //
// description: 게시물 불러오기 요청 함수 //
const getBoardResponseHandler = (responseBody: GetBoardResponseDto | ResponseDto) => {
    const { code } = responseBody;

    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'VF') alert('게시물번호가 잘못되었습니다.');
    if (code === 'DE') alert('데이터베이스 에러입니다.');
    if (code !== 'SU') {
      navigator(MAIN_PATH);
      return;
    }

    setBoard(responseBody as GetBoardResponseDto);
    }
//                      event handler                       //
// description : 컴포넌트 클릭 이벤트 //
const onclickHandler = () => {
    navigator(BOARD_DETAIL_PATH(boardNumber));
}
//                      component                       //
//                      effect                       //
useEffect(() => {
    if (!boardNumber) {
      alert('게시물번호가 잘못되었습니다.');
      navigator(MAIN_PATH);
      return;
    }

    getBoardRequest(boardNumber).then(getBoardResponseHandler);

  }, [boardNumber]);

//                      render                       //
  return (
    <div id='user-board-wrapper' onClick={onclickHandler}>
        <div className='user-board-left-box'>
            <div className='user-board-info-box'>
                <div className='user-board-info-profile'>{boardWriterProfileImageUrl}</div>
                <div className='user-board-info-data'>
                    <div className='user-board-info-nickname'>{boardWriterNickname}</div>
                    <div className='user-board-info-datetime'>{boardWriteDatetime}</div>
                </div>
            </div>
            <div className='user-board-text-box'>
                <div className='user-board-text-title'>{boardTitle}</div>
                <div className='user-board-text-contents'>{boardContents}</div>
            </div>
            <div className='user-board-count-box'>
                {`댓글 ${boardCommentCount} · 좋아요${boardFavoriteCount} · 조회수${boardViewCount}`}
            </div>
        </div>
        <div className='user-board-right-box'>
            <div className='user-board-right-image' style={roomImageBackground}></div>
        </div>
    </div>
  )
}