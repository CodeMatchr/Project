import React, { useState , useEffect } from 'react'
import './style.css';
import { useParams } from 'react-router-dom';
import BoardDetailResponseDto from '../../../interfaces/response/board/board-detail.response.dto';
import { boardDetailMock } from '../../../mocks';
import LikeListResponseDto from '../../../interfaces/response/board/board-like.response.dto';
//     component     //
// 게시물 상세 화면 //
export default function BoardDetail() {
  //        state        //
  // description: 게시물 번호 상태 //
  const {boardNumber} = useParams();
  // description : 게시물 정보 상태 //
  const [board , setBoard] = useState<BoardDetailResponseDto | null>(null);
  // description  : 게시물 좋아요 회원 리스트 상태 //
  const [likeList , setLikeList] = useState<LikeListResponseDto[]>([]);
  // description : 댓글 리스트 상태 //
  const [commentList , setCommentList] = useState<any[]>([]);
  // description: favorite 상태 //
  const [favorite, setFavorite] = useState<boolean>(false);
  // description: 좋아요 리스트 컴포넌트 출력 상태 //
  const [showLikeList, setShowLikeList] = useState<boolean>(false);

  // event handler //
  // description : 좋아요 버튼 클릭 이벤트 //
  const onLikeButtonClickHandler = () => {
    setFavorite(!favorite);
  }
  // description : 좋아요 리스트 펼치기 클릭 이벤트 //
  const onShowLikeListButtonClickHandler = () => {
    setShowLikeList(!showLikeList);
  }

  //      render       //
  return (
    
    <div className='board-detail'>
      <div className='board-detail-box' >
        <div className='board-detail-modify-box'>수정</div>
        <div className='board-detail-delete-box'>삭제</div>
      </div>
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
            <div className='board-detail-bottom-button' onClick={onLikeButtonClickHandler}>
              {favorite ? (<div className='favorite-fill-icon'></div>):(<div className='favorite-icon'></div>)}     
          </div>
          <div className='board-detail-bottom-text'>{`좋아요 ${likeList.length}`}</div>
          <div className='board-detail-bottom-button' onClick={onShowLikeListButtonClickHandler}>
            { showLikeList ? (<div className='up-icon'></div>) : (<div className='down-icon'></div>)}
           </div>
          </div>
          <div className='board-detail-bottom-item'>
            <div className='board-detail-bottom-button'>
              <div className='comment-icon'></div>
            </div>
              <div className='board-detail-bottom-text'>{`댓글 ${commentList.length}`}</div>
              <div className='board-detail-bottom-button'>
                <div className='down-icon'></div>
              </div>
            </div>
        </div>
    </div>
    </div>
  );
}

// description : 좋아요 리스트 컴포넌트 //
