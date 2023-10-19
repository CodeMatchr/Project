import React from 'react';

import './style.css';
import BoardListResponseDto from 'src/interfaces/response/board/board-list.response.dto';

import { dateFormat } from 'src/utils';

interface Props {
  item : BoardListResponseDto;
}

// component //
export default function BoardListItem({item} : Props) {

  // state//
  const {boardNumber, boardTitle, boardContents, boardImageUrl} = item;
  const {boardViewCount, boardCommentCount, boardFavoriteCount} = item;
  const {boardWriteDatetime, boardWriterNickname, boardWriterProfileImageUrl} = item;

  const boardBackground = boardImageUrl ? { backgroundImage : `url(${boardImageUrl})` } : { backgroundColor: 'rgba(0, 0, 0, 0.6)' };
  const writerBackground = boardWriterProfileImageUrl ? { backgroundImage : `url(${boardWriterProfileImageUrl})` } : { backgroundColor: 'rgba(0, 0, 0, 0.6)' };

  // function //

  // event handler //

  // effect //

  // render //
  return (
    <div className='board-list'>
      <div className='board-list-left-image' style={ boardBackground }></div>
      <div className='board-list-mid'>
        <div className='board-list-mid-top'>
          <div className='board-title'>{ boardTitle }</div>
          <div className='board-contents'>{ boardContents }</div>
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
          <div className='board-writer-nickname'>{ boardWriterNickname }</div>
      </div>
    </div>
  )
}
