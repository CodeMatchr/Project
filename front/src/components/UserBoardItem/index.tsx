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
const { boardUserProfileImageUrl, boardUserNickname, boardWriteDatetime } = item;
const { boardFavoriteCount, boardCommentCount, boardViewCount } = item;

// description : 프로필 이미지 상태 //
const roomProfileImageBackground = boardUserProfileImageUrl ? {backgroundImage : `url(${boardUserProfileImageUrl})`} : { backgroundColor : 'rgba(0, 0, 0, 0.6)' };
// description : 게시물 이미지 상태 //
const roomBoardImageBackground = boardImageUrl ? {backgroundImage : `url(${boardImageUrl})`} : { backgroundColor : 'rgba(0, 0, 0, 0.6)' };

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
                <div className='user-board-info-profile' style={roomProfileImageBackground} ></div>
                <div className='user-board-info-data'>
                    <div className='user-board-info-nickname'>{boardUserNickname}</div>
                    <div className='user-board-info-datetime'>{boardWriteDatetime}</div>
                </div>
            </div>
            <div className='user-board-text-box'>
                <div className='user-board-text-title'>{boardTitle}</div>
                <div className='user-board-text-contents'>
                  {boardContents.length > 100 ? boardContents.substring(0,97) + '...' : boardContents}
                </div>
            </div>
            <div className='user-board-count-box'>
                {`댓글 ${boardCommentCount} · 좋아요${boardFavoriteCount} · 조회수${boardViewCount}`}
            </div>
        </div>
        <div className='user-board-right-box'>
            <div className='user-board-right-image' style={roomBoardImageBackground}></div>
        </div>
    </div>
  )
}