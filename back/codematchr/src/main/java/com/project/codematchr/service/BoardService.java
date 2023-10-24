package com.project.codematchr.service;

import org.springframework.http.ResponseEntity;

import com.project.codematchr.dto.request.board.PatchBoardRequestDto;
import com.project.codematchr.dto.request.board.PostBoardRequestDto;
import com.project.codematchr.dto.request.board.PostcommentRequestDto;
import com.project.codematchr.dto.response.board.DeleteBoardResponseDto;
import com.project.codematchr.dto.response.board.GetBoardListResponseDto;
import com.project.codematchr.dto.response.board.GetBoardResponseDto;
import com.project.codematchr.dto.response.board.GetCommentListResponseDto;
import com.project.codematchr.dto.response.board.GetFavoriteListResponseDto;
import com.project.codematchr.dto.response.board.GetSearchBoardResponseDto;
import com.project.codematchr.dto.response.board.GetTop3CommentListResponseDto;
import com.project.codematchr.dto.response.board.GetTop3CurrentListResponseDto;
import com.project.codematchr.dto.response.board.GetTop3FavoriteListResponseDto;
import com.project.codematchr.dto.response.board.GetTop3ViewListResponseDto;
import com.project.codematchr.dto.response.board.GetUserListResponseDto;
import com.project.codematchr.dto.response.board.PatchBoardResponseDto;
import com.project.codematchr.dto.response.board.PostBoardResponseDto;
import com.project.codematchr.dto.response.board.PostCommentResponseDto;
import com.project.codematchr.dto.response.board.PutFavoriteResponseDto;


public interface BoardService {
    
    // method : 게시물 작성 메서드 //
    ResponseEntity<? super PostBoardResponseDto> postBoard(String boardWriterEmail, PostBoardRequestDto dto);
    // method : 게시물 수정 메서드 //
    ResponseEntity<? super PatchBoardResponseDto> patchBoard(String boardWriterEmail, Integer boardNumber, PatchBoardRequestDto dto);
    // method : 게시물 삭제 메서드 //
    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(String userEmail, Integer boardNumber);
    // method : 게시물 조회 메서드 //
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    
    // method : TOP3 게시물 최신순 조회 메서드 //
    ResponseEntity<? super GetTop3CurrentListResponseDto> getTop3Current();
    // method : TOP3 게시물 댓글순 조회 메서드 //
    ResponseEntity<? super GetTop3CommentListResponseDto> getTop3Comment();
    // method : TOP3 게시물 좋아요순 조회 메서드 //
    ResponseEntity<? super GetTop3FavoriteListResponseDto> getTop3Favorite();
    // method : TOP3 게시물 조회수순 조회 메서드 //
    ResponseEntity<? super GetTop3ViewListResponseDto> getTop3View();

    // method : 댓글 작성 메서드 //
    ResponseEntity<? super PostCommentResponseDto> postComment(Integer commentBoardNumber, String commentUserEmail, PostcommentRequestDto dto);
    // method : 좋아요 기능 메서드 //
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer favoriteBoardNumber, String favoriteUserEmail);
    // method : 특정 유저의 게시물 리스트 조회 메서드 //
    ResponseEntity<? super GetUserListResponseDto> getUserBoardList(String writerEmail);
    // method : 특정 게시물의 댓글 리스트 조회 메서드 //
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer commentBoardNumber);
    // method : 특정 게시물의 좋아요 리스트 조회 메서드 //
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer favoriteBoardNumber);
    // method : 검색 게시물 리스트 조회 메서드 //
    ResponseEntity<? super GetSearchBoardResponseDto> getSearchBoard(String searchword);

    // 게시물 리스트 최신 메서드 //
    ResponseEntity<? super GetBoardListResponseDto> getBoardList(Integer section);
    // 게시물 리스트 조회수 메서드 //
    ResponseEntity<? super GetBoardListResponseDto> getBoardViewList(Integer section);
    // 게시물 리스트 좋아요 메서드 //
    ResponseEntity<? super GetBoardListResponseDto> getBoardFavoriteList(Integer section);
    // 게시물 리스트 댓글 메서드 //
    ResponseEntity<? super GetBoardListResponseDto> getBoardCommentList(Integer section);

}
