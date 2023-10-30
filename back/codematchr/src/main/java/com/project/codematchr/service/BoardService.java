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
    
    ResponseEntity<? super PostBoardResponseDto> postBoard(String boardWriterEmail, PostBoardRequestDto dto);

    ResponseEntity<? super PatchBoardResponseDto> patchBoard(String boardWriterEmail, Integer boardNumber, PatchBoardRequestDto dto);

    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(String userEmail, Integer boardNumber);

    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    
    ResponseEntity<? super GetTop3CurrentListResponseDto> getTop3Current();

    ResponseEntity<? super GetTop3CommentListResponseDto> getTop3Comment();

    ResponseEntity<? super GetTop3FavoriteListResponseDto> getTop3Favorite();

    ResponseEntity<? super GetTop3ViewListResponseDto> getTop3View();

    ResponseEntity<? super PostCommentResponseDto> postComment(Integer commentBoardNumber, String commentUserEmail, PostcommentRequestDto dto);

    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer favoriteBoardNumber, String favoriteUserEmail);

    ResponseEntity<? super GetUserListResponseDto> getUserBoardList(String writerEmail);

    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer commentBoardNumber);

    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer favoriteBoardNumber);

    ResponseEntity<? super GetSearchBoardResponseDto> getSearchBoard(String searchword);

    ResponseEntity<? super GetBoardListResponseDto> getBoardList(Integer section);

    ResponseEntity<? super GetBoardListResponseDto> getBoardViewList(Integer section);

    ResponseEntity<? super GetBoardListResponseDto> getBoardFavoriteList(Integer section);

    ResponseEntity<? super GetBoardListResponseDto> getBoardCommentList(Integer section);

}
