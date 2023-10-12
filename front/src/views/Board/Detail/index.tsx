import React from 'react'
import './style.css';
export default function BoardDetail() {
  return (
    <div className='board-detail'>
        <div className='board-detail-container'>
          <div className='board-detail-top'>
            <div className='board-detail-top-left'>
              <div className='board-detail-top-title'>
                <div className='board-detail-title'>게시물 제목</div>
                <div className='board-detail-write-date'>2023.10.11</div>
              </div>
              <div className='board-detail-content'>게시물 내용</div>
            </div>  
            <div className='board-detail-top-right'>
              <div className='board-detail-profile-image'>프로필 이미지</div>
              <div className='board-detail-user-nickname'>Nickname</div>
            </div>   
          </div>
          <div className='board-detail-meta-container'>
          <div className='board-middle'>
            <div className='board-detail-board-image'>보드 이미지</div>
          </div>
          </div>  
        <div className='board-detail-bottom'>
          <div className='board-detail-bottom-item'>
            <div className='board-detail-bottom-button'>
              <div className='favorite-icon'></div>
          </div>
          <div className='board-detail-bottom-text'>{`좋아요 0`}</div>
          <div className='board-detail-bottom-button'>
            <div className='down-icon'></div>
           </div>
          </div>
          <div className='board-detail-bottom-item'>
            <div className='board-detail-bottom-button'>
              <div className='comment-icon'></div>
            </div>
              <div className='board-detail-bottom-text'>{`댓글 0`}</div>
              <div className='board-detail-bottom-button'>
                <div className='down-icon'></div>
              </div>
            </div>
        </div>
    </div>
    </div>
    
  );
}
