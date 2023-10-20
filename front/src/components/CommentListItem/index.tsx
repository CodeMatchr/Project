import React from 'react'
import './style.css';
import { CommentListResponseDto } from '../../interfaces/response/board/get-comment-list.response.dto';

interface Props {
  item: CommentListResponseDto;
}

// component
export default function CommentListItem({ item }: Props) {

  // state //
  const { nickname, contents, writeDatetime, profileImageUrl } = item;

  // function //
  // 현재시간과 작성시간의 차이 함수//
  const getTimeGap = () => {
    const writeDate = new Date(writeDatetime);
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
               style={{ backgroundImage: `url(${profileImageUrl})` }}></div>
        </div>
        <div className='comment-list-item-writer-nickname'>{ nickname }</div>
        <div className='comment-list-item-writer-divider'>|</div>
        <div className='comment-list-item-write-time'>{ getTimeGap() }</div>
      </div>
      <div className='comment-list-item-comment'>{ contents }</div>
    </div>
  )
}