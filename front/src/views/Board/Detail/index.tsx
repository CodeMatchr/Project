import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from 'src/store';
import { useCookies } from 'react-cookie';
import GetBoardResponseDto from 'src/interfaces/response/board/get-board.response.dto';
import GetFavoriteListResponseDto, { FavoriteListResponseDto } from 'src/interfaces/response/board/get-favorite-list.response.dto';
import GetCommentListResponseDto, { CommentListResponseDto } from 'src/interfaces/response/board/get-comment-list.response.dto';
import { BOARD_LIST_PATH, COUNT_BY_PAGE_COMMENT, MAIN_PATH } from 'src/constants';
import ResponseDto from 'src/interfaces/response/response.dto';
import { usePagination } from 'src/hooks';
import { getBoardCommentListRequest, getBoardFavoriteListRequest, getBoardRequest, getCommentListRequest, getFavoriteListRequest, putFavoriteRequest } from 'src/apis';
import { dateFormat } from 'src/utils';

// component //
export default function BoardDetail() {

    // state //
    // 게시물 path //
    const {boardNumber} = useParams();

    // 로그인 유저 //
    const {user} = useUserStore();

    // 페이지네이션 //
    const { totalPage, currentPage, currentSection, onNextClickHandler, onPageClickHandler, onPreviousClickHandler, changeSection } = usePagination();

    // Cookies //
    const [cookies, setCookie] = useCookies();

    // 게시물 상태 //
    const [board, setBoard] = useState<GetBoardResponseDto | null>(null);

    // 좋아요 리스트 상태 //
    const [favoriteList, setFavoriteList] = useState<FavoriteListResponseDto[]>([]);

    // 댓글 리스트 상태 //
    const [commentList, setCommentList] = useState<CommentListResponseDto[]>([]);

    

    // 현재 페이지에서 보여줄 댓글 리스트 상태 //
    const [pageCommentList, setPageCommentList] = useState<CommentListResponseDto[]>([]);

    // 좋아요 컴포넌트 상태 //
    const [viewFavoriteList, setViewFavoriteList] = useState<boolean>(false);

    // 댓글 컴포넌트 상태 //
    const [viewCommentList, setViewCommentList] = useState<boolean>(false);

    // function //
    const navigator = useNavigate();

    // 댓글 리스트 페이지네이션 //
    const getPageCommentList = (commentList: CommentListResponseDto[]) => {
        const lastIndex = commentList.length > COUNT_BY_PAGE_COMMENT * currentPage ?
          COUNT_BY_PAGE_COMMENT * currentPage : commentList.length;
        const startIndex = COUNT_BY_PAGE_COMMENT * (currentPage - 1);
        const pageCommentList = commentList.slice(startIndex, lastIndex);
        setPageCommentList(pageCommentList);
      }

    // 게시물 불러오기 //
    const getBoardResponseHandler = (responseBody: GetBoardResponseDto | ResponseDto) => {
        const { code } = responseBody;
    
        if (code === 'NB') alert('존재하지 않는 게시물입니다.');
        if (code === 'VF') alert('게시물번호가 잘못되었습니다.');
        if (code === 'DE') alert('데이터베이스 에러입니다.');
        if (code !== 'SU') {
          navigator(BOARD_LIST_PATH);
          return;
        }

        setBoard(responseBody as GetBoardResponseDto);
      }

    // 좋아요 리스트 불러오기 //
    const getFavoriteResponseHandler = (responseBody: GetFavoriteListResponseDto | ResponseDto) => {
        const { code } = responseBody;
    
        if (code === 'VF') alert('잘못된 게시물번호입니다.');
        if (code === 'DE') alert('데이터베이스 에러입니다.');
        if (code !== 'SU') {
          setFavoriteList([]);
          return;
        }
        const { favoriteList } = responseBody as GetFavoriteListResponseDto;
            setFavoriteList(favoriteList);
    }

    // 댓글 리스트 불러오기 //
    const getCommentListResponseHandler = (responseBody: GetCommentListResponseDto | ResponseDto) => {
        const { code } = responseBody;
    
        if (code === 'VF') alert('잘못된 게시물번호입니다.');
        if (code === 'DE') alert('데이터베이스 에러입니다.');
        if (code !== 'SU') {
          setCommentList([]);
          return;
        }
    
        const { commentList } = responseBody as GetCommentListResponseDto;
        setCommentList(commentList);
        
        getPageCommentList(commentList);
    
        changeSection(commentList.length, COUNT_BY_PAGE_COMMENT);
      }

    // event handler //
    // effect //

   const Board = () => {

    // state //
    // 좋아요 상태 //
    const [favorite, setFavorite] = useState<boolean>(false);

    // function //
     // 좋아요 응답 //
     const putFavoriteResponseHandler = (code: string) => {
        if (code === 'NU') alert('존재하지 않는 유저입니다.');
        if (code === 'NB') alert('존재하지 않는 게시물입니다.');
        if (code === 'VF') alert('잘못된 입력입니다.');
        if (code === 'DE') alert('데이터베이스 에러입니다.');
        if (code !== 'SU') return;
  
        if (!boardNumber) return;
        getBoardFavoriteListRequest(boardNumber).then(getFavoriteResponseHandler);
      }

      // effect //
      // 좋아요 버튼 클릭 //
    const onFavoriteButtonClickHandler = () => {
        if (!boardNumber) return;
        const token = cookies.accessToken;
        putFavoriteRequest(boardNumber, token).then(putFavoriteResponseHandler);
      }

    // 좋아요 리스트 펼치기 클릭 //
    const onShowFavoriteListButtonClickHandler = () => {
        setViewFavoriteList(!viewFavoriteList);
        }

    //  댓글 리스트 펼치기 클릭 //
    const onShowCommentListButtonClickHandler = () => {
        setViewCommentList(!viewCommentList);
        }

    // 게시물 수정 클릭 //
    const onBoardUpdateClickHandler = () => {
        if(!board) return;
        navigator(MAIN_PATH);
    }

    // 게시물 삭제 클릭 //
    const onBoardDeleteClickHandler = () => {
        if(!boardNumber) return;
        const token = cookies.accessToken;
        putFavoriteRequest(boardNumber, token).then(putFavoriteResponseHandler);
    }

    // effent //
    // 좋아요 리스트 변경시 실행 //
    useEffect(() => {
        const favorited = favoriteList.findIndex((item) => item.userEmail === user?.userEmail);
        setFavorite(favorited !== -1);
    }, [favoriteList]);

    // render //
    return (
        <div id='board-detail-wrapper'>
            <div className='board-detail-button-box'>
                    <div className='board-detail-update-button' onClick={onBoardUpdateClickHandler} >수정</div>
                    <div className='board-detail-delete-button' onClick={onBoardDeleteClickHandler}>삭제</div>
            </div>
            <div className='board-detail-box'>    
                <div className='board-detail-list'>
                    <div className='board-detail-data'>
                        <div className='board-detail-write-datetime'>{ dateFormat(board?.boardWriteDatetime as string) }</div>
                        <div className='board-detail-title'>{board?.boardTitle}</div>
                    </div>
                    <div className='board-detail-writer-profile'>
                        <div className='board-detail-writer-profile-image' style={{ backgroundImage: `url(${board?.boardWriterProfileImageUrl ? board.boardWriterProfileImageUrl : ''})` }} ></div>
                        <div className='board-detail-writer-nickname'>{board?.boardWriterNickname}</div>
                    </div>
                </div>
                <div className='board-detail-body'>
                    <div className='board-detail-body-contents'>{board?.boardContents}</div>
                    <div className='board-detail-body-image-box'>
                        <img className='board-detail-image' src="" alt="board-detail-image" />
                    </div>
                </div>
                <div className='board-detail-show-button'>
                    <div className='board-detail-favorite-icon-box'>
                        <div className='board-detail-favorite-show-icon' onClick={onShowFavoriteListButtonClickHandler} >
                            {favorite ? (<div className='board-detail-favorite-show-icon'></div>) : (<div className='board-detail-favorite-show-icon'></div>)}
                        </div>
                        <div className='board-detail-favorite'>{`좋아요 ${favoriteList.length}`}</div>
                    </div>
                    <div className='board-detail-comment-icon-box'>
                        <div className='board-detail-comment-show-icon' onClick={onShowCommentListButtonClickHandler} ></div>
                        <div className='board-detail-comment'>{`댓글 ${commentList.length}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

    const FavoriteList = () => {
        return (
            <div className='board-detail-favorite-list'>
                <div className='board-detail-favorite-list-title'>좋아요{favoriteList.length}</div>
                <div className='board-detail-favorite-list-user'>
                    {favoriteList.map((item) => (
                        <div className='favorite-list-item-box'>
                        <div className='favorite-list-item-writer-profile' style={{ backgroundImage: `url(${item.userProfileImageUrl})` }} >
                            <div className='favorite-list-item-profile-image'></div>
                            <div className='favorite-list-item-writer-data'>
                                <div className='favorite-list-item-writer-nickname'>{item.userNickname}</div>
                                <div className='favorite-list-item-write-time'>2023.10.22</div>
                            </div>
                        </div>
                    </div>
                    ) )}
                </div>
            </div>
        );
    }

    const CommentList = () => {
        return (
            <div className='board-detail-comment-list'>
                <div className='board-detail-comment-list-title'>댓글{commentList.length}</div>
                <div className='board-detail-comment-list-user'>
                    {/* component ? */}
                    <div className='comment-list-item-box'>
                        <div className='comment-list-item-writer-profile'>
                            <div className='comment-list-item-profile-image'>이미지</div>
                            <div className='comment-list-item-writer-data'>
                                <div className='comment-list-item-writer-nickname'>닉네임</div>
                                <div className='comment-list-item-write-time'>타임</div>
                            </div>
                        </div>
                        <div className='comment-list-item-comment'>댓글</div>
                    </div>
                </div>
            </div>
        );
    } 
              
    // effect //
    // 게시물 번호가 바뀌면 랜더링 //
    useEffect(() => {
        if(!boardNumber) {
            alert('게시물 번호를 다시 확인해주세요.');
            return;
        }

        getBoardRequest(boardNumber).then(getBoardResponseHandler);
        getBoardFavoriteListRequest(boardNumber).then(getFavoriteResponseHandler);
        getBoardCommentListRequest(boardNumber).then(getCommentListResponseHandler);
    }, [boardNumber]);

    // 현재 페이지가 바뀔때 마다 검색 게시물 분류하기 //
    useEffect(() => {
        getPageCommentList(commentList);
    }, [currentPage]);
    // 현재 페이지가 바뀔때 마다 페이지 리스트 변경 //
    useEffect(() => {
        changeSection(commentList.length, COUNT_BY_PAGE_COMMENT);
    }, [currentSection]);

    return (
        <div>
            <Board/>
            <FavoriteList/>
            <CommentList/>
        </div>
    ); 
}
