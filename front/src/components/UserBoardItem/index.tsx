import React from 'react'
import './style.css';
import BoardListResponseDto from '../../interfaces/response/board/board-list.response.dto';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_PATH } from '../../constants';


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

//                      function                       //
//                      event handler                       //
// description : 컴포넌트 클릭 이벤트 //
const onclickHandler = () => {
    navigator(BOARD_DETAIL_PATH(boardNumber));
}
//                      component                       //
//                      effect                       //


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
