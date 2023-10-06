package com.project.codematchr.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.codematchr.dto.request.board.PatchBoardRequestDto;
import com.project.codematchr.dto.request.board.PostBoardRequestDto;
import com.project.codematchr.dto.request.board.PostcommentRequestDto;
import com.project.codematchr.dto.response.board.DeleteBoardResponseDto;
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
import com.project.codematchr.service.BoardService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {
    
    private final BoardService boardService;

    // API : 게시물 작성 메서드 //
    // todo : @AuthenticationPrincipal 은 security //
    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
        String boardWriterEmail,
        @RequestBody @Valid PostBoardRequestDto requestBody
    ){
        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(boardWriterEmail, requestBody);
        return response;
    }

    // API : 게시물 수정 메서드 //
    // todo : @AuthenticationPrincipal 은 security //
    @PatchMapping("/{boardNumber}")
    public ResponseEntity<? super PatchBoardResponseDto> patchBoard(
        String boardWriterEmail,
        @PathVariable Integer boardNumber, 
        @RequestBody @Valid PatchBoardRequestDto dto
        ){
        ResponseEntity<? super PatchBoardResponseDto> response = boardService.patchBoard(boardWriterEmail, boardNumber, dto);
        return response;
    }

    // API : 게시물 삭제 메서드 //
    // todo : @AuthenticationPrincipal 은 security //
    @DeleteMapping("/{boardNumber}")
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
        String userEmail,
        @PathVariable Integer boardNumber
    ){
        ResponseEntity<? super DeleteBoardResponseDto> response = boardService.deleteBoard(userEmail, boardNumber);
        return response;
    }

    // API : 게시물 조회 메서드 //
    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(
        @PathVariable Integer boardNumber
    ){
        ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNumber);
        return response;
    }

    // API : 댓글 작성 메서드 //
    // todo : @AuthenticationPrincipal 은 security //
    @PostMapping("/{commentBoardNumber}/comment")
    public ResponseEntity<? super PostCommentResponseDto> postComment(
        String commentUserEmail,
        @PathVariable Integer commentBoardNumber,
        @RequestBody @Valid PostcommentRequestDto requestbody
    ){
        ResponseEntity<? super PostCommentResponseDto> response = boardService.postComment(commentBoardNumber, commentUserEmail, requestbody);
        return response;
    }

    // API : 좋아요 기능 메서드 //
    @PutMapping("/{favoriteBoardNumber}/favorite")
    // todo : @AuthenticationPrincipal 은 security //
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
        String favoriteUserEmail,
        @PathVariable Integer favoriteBoardNumber
    ){
        ResponseEntity<? super PutFavoriteResponseDto> response = boardService.putFavorite(favoriteBoardNumber, favoriteUserEmail);
        return response;
    }

    // API : 특정 유저의 게시물 리스트 조회 메서드 //
    @GetMapping("/user-board-list/{writerEmail}")
    public ResponseEntity<? super GetUserListResponseDto> getUserBoardList(
        @PathVariable String writerEmail
        ){
        ResponseEntity<? super GetUserListResponseDto> response = boardService.getUserBoardList(writerEmail);
        return response;
    }

    // API : 특정 게시물의 댓글 리스트 조회 메서드 //
    @GetMapping("/{commentBoardNumber}/comment-list")
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(
        @PathVariable Integer commentBoardNumber
    ){
        ResponseEntity<? super GetCommentListResponseDto> response = boardService.getCommentList(commentBoardNumber);
        return response;
    }

    // API : 특정 게시물의 좋아요 리스트 조회 메서드 //
    @GetMapping("/{favoriteBoardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(
        @PathVariable Integer favoriteBoardNumber
    ){
        ResponseEntity<? super GetFavoriteListResponseDto> response = boardService.getFavoriteList(favoriteBoardNumber);
        return response;
    }
    
    // API : 검색 게시물 리스트 조회 메서드 //
    @GetMapping("/search/{searchWord}")
    public ResponseEntity<? super GetSearchBoardResponseDto> getSearchBoard(
        @PathVariable String searchWord
        ){
            ResponseEntity<? super GetSearchBoardResponseDto> response = boardService.getSearchBoard(searchWord);
        return response;
    }
    
    // API : TOP3 게시물 최신순 리스트 조회 메서드 //
    @GetMapping("/top-3/current")
    public ResponseEntity<? super GetTop3CurrentListResponseDto> getTop3Current(){
        ResponseEntity<? super GetTop3CurrentListResponseDto> response = boardService.getTop3Current();
        return response;
    }

    // API : TOP3 게시물 댓글순 리스트 조회 메서드 //
    @GetMapping("/top-3/comment")
    public ResponseEntity<? super GetTop3CommentListResponseDto> getTop3Comment(){
        ResponseEntity<? super GetTop3CommentListResponseDto> response = boardService.getTop3Comment();
        return response;
    }

    // API : TOP3 게시물 좋아요순 리스트 조회 메서드 //
    @GetMapping("/top-3/favorite")
    public ResponseEntity<? super GetTop3FavoriteListResponseDto> getTop3Favorite(){
        ResponseEntity<? super GetTop3FavoriteListResponseDto> response = boardService.getTop3Favorite();
        return response;
    }

    // API : TOP3 게시물 조회수순 리스트 조회 메서드 //
    @GetMapping("/top-3/view")
    public ResponseEntity<? super GetTop3ViewListResponseDto> getTop3View(){
        ResponseEntity<? super GetTop3ViewListResponseDto> response = boardService.getTop3View();
        return response;
    }
    

}

