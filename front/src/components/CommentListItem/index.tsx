import React from 'react'
import './style.css';
import { CommentListResponseDto } from '../../interfaces/response/board/board-comment-list.response.dto';

interface Props {
  item: CommentListResponseDto;
}

// component
export default function CommentListItem({ item }: Props) {

  // state //
  const { writerProfileImage, writerNickName, writeDateTime, comment } = item;

  // function //
  // 현재시간과 작성시간의 차이 함수//
  const getTimeGap = () => {
    const writeDate = new Date(writeDateTime);
    writeDate.setHours(writeDate.getHours() - 9);

    const writeDateNumber = writeDate.getTime();
    const nowDateNumber = new Date().getTime();

    const gap = Math.floor((nowDateNumber - writeDateNumber) / 1000);

    let result = '';
    if (gap >= 3600) result = `${Math.floor(gap /3600)}시간 전`;
    if (gap < 3600) result = `${Math.floor(gap / 60)}분 전`;
    if (gap < 60) result = `${gap}초 전`;

    return result;
  }

  // render //
  return (
    <div className='comment-list-item-box'>
      <div className='comment-list-item-writer'>
        <div className='comment-list-item-profile'>
          <div className='comment-list-item-profile-image'
               style={{ backgroundImage: `url(${writerProfileImage})` }}></div>
        </div>
        <div className='comment-list-item-writer-nickname'>{ writerNickName }</div>
        <div className='comment-list-item-writer-divider'>|</div>
        <div className='comment-list-item-write-time'>{ writeDateTime }</div>
      </div>
      <div className='comment-list-item-comment'>{ comment }</div>
    </div>
  )
}