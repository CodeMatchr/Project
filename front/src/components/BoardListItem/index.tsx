import React, { useEffect, useState } from 'react';

import './style.css';
import BoardListResponseDto from 'src/interfaces/response/board/board-list.response.dto';

import { dateFormat } from 'src/utils';
import GetBoardResponseDto from 'src/interfaces/response/board/get-board.response.dto';
import { useNavigate } from 'react-router-dom';
import ResponseDto from 'src/interfaces/response/response.dto';
import { BOARD_DETAIL_PATH, BOARD_PATH, MAIN_PATH } from 'src/constants';
import { getBoardRequest } from 'src/apis';

interface Props {
  item : BoardListResponseDto;
}

// component //
export default function BoardListItem({item} : Props) {

  // state //
  const {boardNumber, boardTitle, boardContents, boardImageUrl} = item;
  const {boardViewCount, boardCommentCount, boardFavoriteCount} = item;
  const {boardWriteDatetime, boardUserNickname, boardUserProfileImageUrl} = item;

  const boardBackground = boardImageUrl ? { backgroundImage : `url(${boardImageUrl})` } : { backgroundColor: 'rgba(0, 0, 0, 0.6)' };
  const writerBackground = boardUserProfileImageUrl ? { backgroundImage : `url(${boardUserProfileImageUrl})` } : { backgroundColor: 'rgba(0, 0, 0, 0.6)' };

  const navigator = useNavigate();
  const [board, setBoard] = useState<GetBoardResponseDto | null>(null);

  // function //
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
    
    // event handler //
    const onBoardClickHandler = () => {
      getBoardRequest(boardNumber).then(getBoardResponseHandler);
      navigator(BOARD_DETAIL_PATH(boardNumber));
    }

  // effect //


  // render //
  return (
    <div className='board-list' onClick={onBoardClickHandler}>
      <div className='board-list-left-image' style={ boardBackground }></div>
      <div className='board-list-mid'>
        <div className='board-list-mid-top'>
          <div className='board-title'>{ boardTitle }</div>
          <div className='board-contents'>
            { boardContents.length > 100 ? boardContents.substring(0,97) + "..." : boardContents }
           </div>
          <div className='board-write-datetime'>{ dateFormat(boardWriteDatetime) }</div>
        </div>
        <div className='board-list-mid-bottom'>
          <div className='board-count'>{`조회수 ${boardViewCount}`}</div>
          <div className='board-favorite'>{`좋아요 수 ${boardFavoriteCount}`}</div>
          <div className='board-comment'>{`댓글 수 ${boardCommentCount}`}</div>
        </div>
      </div>
      <div className='board-list-right'>
          <div className='board-writer-profile' style={ writerBackground }></div>
          <div className='board-writer-nickname'>{ boardUserNickname }</div>
      </div>
    </div>
  )
}
