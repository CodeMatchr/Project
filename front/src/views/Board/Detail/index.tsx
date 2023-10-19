import React, { useState , useEffect, ChangeEvent } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import BoardDetailResponseDto from '../../../interfaces/response/board/board-detail.response.dto';
import LikeListResponseDto from '../../../interfaces/response/board/board-like.response.dto';
import { usePagination } from '../../../hooks';
import Pagination from '../../../components/Pagination';
import { CommentListResponseDto } from '../../../interfaces/response/board/board-comment-list.response.dto';
import { COUNT_BY_PAGE_COMMENT, MAIN_PATH } from '../../../constants';
import CommentListItem from '../../../components/CommentListItem';
import { getBoardRequest } from 'src/apis';
import GetBoardResponseDto from 'src/interfaces/response/board/get-board.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import { useUserStore } from 'src/store';
//     component     //
// 게시물 상세 화면 //
export default function BoardDetail() {

  //        state        //
  // description: 게시물 번호 상태 //
  const {boardNumber} = useParams();
  // description : 유저 이메일 상태 //
  const { userEmail } = useParams();
  // description : 로그인 유저 정보 상태 //
  const {user, setUser} = useUserStore();

  // description:  //
  const { totalPage ,  currentPage , currentSection , onNextClickHandler , onPageClickHandler , onPreviousClickHandler ,changeSection } = usePagination();
  // description : 게시물 정보 상태 //
  const [board , setBoard] = useState<BoardDetailResponseDto | null>(null);
  // 내 게시물 여부 //
  const [writer , setWriter] = useState<boolean>(false);

  // description  : 게시물 좋아요 회원 리스트 상태 //
  const [likeList , setLikeList] = useState<LikeListResponseDto[]>([]);
  // description : 댓글 리스트 상태 //
  const [commentList, setCommentList] = useState<CommentListResponseDto[]>([]);
  // description : 현재 페이지에서 보여줄 댓글 리스트 상태 //
  const [pageCommentList, setPageCommentList] = useState<CommentListResponseDto[]>([]);
  // description: 좋아요 리스트 컴포넌트 출력 상태 //
  const [showLikeList, setShowLikeList] = useState<boolean>(false);
   // description: 댓글 리스트 컴포넌트 출력 상태 //
  const [showCommentList, setShowCommentList] = useState<boolean>(false);

  //          function          //
  // description: 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  // description: 현재 페이지의 댓글 리스트 분류 함수 //
  const getPageCommentList = (commentList : CommentListResponseDto[]) => {
    const lastIndex = commentList.length > COUNT_BY_PAGE_COMMENT * currentPage ?
      COUNT_BY_PAGE_COMMENT * currentPage : commentList.length;
    const startIndex = COUNT_BY_PAGE_COMMENT * (currentPage - 1);
    const pageCommentList = commentList.slice(startIndex, lastIndex);
    setPageCommentList(pageCommentList);
  }

  // description : 게시물 불러오기 응답 처리 //
  const getBoardResponseHandler = (responseBody: GetBoardResponseDto | ResponseDto) => {
    const { code } = responseBody;
    if(code === 'NB') alert('존재하지 않는 게시물입니다.');
    if(code === 'VF') alert('잘못된 게시물 번호입니다.');
    if(code === 'DE') alert('데이터 베이스 에러입니다.');
    if(code !== 'SU') {
        navigator(MAIN_PATH);
        return;
    }   

    const board = responseBody as GetBoardResponseDto;
    setBoard(board);
}

  //    component     //
  //  description : 실제 게시물 컴포넌트 //
  const Board = () => {
  //  state    //
  // description: favorite 상태 //
  const [favorite, setFavorite] = useState<boolean>(false); 

  // event handler //

  // description : 좋아요 버튼 클릭 이벤트 //
  const onLikeButtonClickHandler = () => {
    setFavorite(!favorite);
  }
  // description : 좋아요 리스트 펼치기 클릭 이벤트 //
  const onShowLikeListButtonClickHandler = () => {
    setShowLikeList(!showLikeList);
  }
   // description: 댓글 리스트 펼치기 클릭 이벤트 //
    const onShowCommentListButtonClickHandler = () => {
    setShowCommentList(!showCommentList);
   }

  // effect //
  // description : 게시물 번호가 바뀔 때 마다 새로운 정보 받아오기 //
  let boardNumberFlag = true; 
    
  useEffect(() => {
    if(boardNumberFlag) {
        boardNumberFlag = false;
        return;
    }
    if(!boardNumber) {
        alert('게시물 번호가 잘못되었습니다.');
        navigator(MAIN_PATH);
        return;
    }
    getBoardRequest(boardNumber).then(getBoardResponseHandler);
  }, [boardNumber]);
  
  // description : 게시물과 유저 정보가 바뀔 때마다 실행 //
  useEffect (() => {
    const isWriter = user?.userEmail === board?.boardWriterEmail;
    setWriter(isWriter);
  }, [board, user]);

  
  
  //      render       //
  return (
    
    <div className='board-detail-wrapper'>
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
              <div className='board-detail-bottom-button' onClick={onShowCommentListButtonClickHandler}>
              {showCommentList ? (<div className='up-icon'></div>) : (<div className='down-icon'></div>)}
              </div>
            </div>
        </div>
    </div>
    </div>
    
  );
}

  // description: 좋아요 리스트 컴포넌트 //
  const LikeList = () => {

    //          state        //

    //          function        //

    //          event handler        //

    //          component        //

    //          effect        //

    //          render        //
    return (
      <div className='like-list-box'>
        <div className='like-list-title'>좋아요 <span className='like-list-title-emphasis'>{likeList.length}</span></div>
        <div className='like-list-container'>
          {likeList.map((item) => (
            <div className='like-list-item'>
              <div className='like-user-profile' style={{ backgroundImage: `url(${item.likeUserProfileImage})` }}></div>
              <div className='like-user-nickname'>{item.likeUserNickname}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  
  //description : 댓글 컴포넌트 //
  const Comments = () => {

    //          state        //
    // description: 사용자 댓글 입력 상태 //
    const [comment, setComment] = useState<string>('');
    // 댓글 갯수 상태 //
    const [commentCount, setCommentCount] = useState<number>(0);

    //          event handler        //
    // description: 사용자 댓글 입력 변경 이벤트 //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.target.value);
    }

    // effect //
    // description: 현재 페이지가 바뀔때 마다 //
    useEffect(() => {
      getPageCommentList(commentList);
    }, [currentPage]);
    
    // description: 현재 섹션이 바뀔때 마다 페이지 리스트 변경 //
    useEffect(() => {
      changeSection(commentCount, COUNT_BY_PAGE_COMMENT);
  }, [currentSection]);


    // render //
    return (
      <div className='comment-list-box'>
        <div className='comment-list-top'>
          <div className='comment-list-title'>댓글 <span className='comment-list-title-emphasis'>{commentList.length}</span></div>
          <div className='comment-list-container'>
            {pageCommentList.map((item) => (<CommentListItem item={item} />)) }
          </div>
        </div>
        <div className='divider'></div>
        {commentList.length !== 0 && (
          <Pagination 
            totalPage={totalPage} 
            currentPage={currentPage} 
            onNextClickHandler={onNextClickHandler}
            onPreviousClickHandler={onPreviousClickHandler}
            onPageClickHandler={onPageClickHandler}
          />
        )}
        <div className='comment-box'>
        <textarea className='comment-textarea' placeholder='댓글을 작성해주세요.'
         rows={3} value={comment} onChange={onCommentChangeHandler}></textarea>
          <div className='comment-button-box'>
          { comment ? (<div className='comment-button'>댓글달기</div>)
           : (<div className='comment-disable-button'>댓글달기</div>) }
          </div>
        </div>
      </div>
    );
  }


  // effect //
  
  

  //          render          //
  return (
    <div id='board-detail-wrapper'>
      <Board />
      {showLikeList && (<LikeList />)}
      {showCommentList && (<Comments />)}
    </div>
  )
}