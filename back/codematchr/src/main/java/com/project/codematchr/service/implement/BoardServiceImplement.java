package com.project.codematchr.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.dto.request.board.PatchBoardRequestDto;
import com.project.codematchr.dto.request.board.PostBoardRequestDto;
import com.project.codematchr.dto.request.board.PostcommentRequestDto;
import com.project.codematchr.dto.response.board.BoardListResponseDto;
import com.project.codematchr.dto.response.board.CommentListResponseDto;
import com.project.codematchr.dto.response.board.DeleteBoardResponseDto;
import com.project.codematchr.dto.response.board.FavoriteListResponseDto;
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
import com.project.codematchr.entity.BoardEntity;
import com.project.codematchr.entity.BoardViewEntity;
import com.project.codematchr.entity.CommentEntity;
import com.project.codematchr.entity.FavoriteEntity;
import com.project.codematchr.entity.UserEntity;
import com.project.codematchr.entity.resultSet.BoardListResultSet;
import com.project.codematchr.entity.resultSet.CommentListResultSet;
import com.project.codematchr.repository.BoardRepository;
import com.project.codematchr.repository.BoardViewRepository;
import com.project.codematchr.repository.CommentRepository;
import com.project.codematchr.repository.FavoriteRepository;
import com.project.codematchr.repository.UserRepository;
import com.project.codematchr.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
    
    private final BoardRepository boardRepository;
    private final BoardViewRepository boardViewRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final FavoriteRepository favoriteRepository;

// description : 게시물 작성 //
@Override
public ResponseEntity<? super PostBoardResponseDto> postBoard(String boardWriterEmail, PostBoardRequestDto dto) {
    
    try {
        // description : 작성자 이메일이 존재하는지 확인 //
        boolean hasWriterEmail = userRepository.existsByUserEmail(boardWriterEmail);
        if(!hasWriterEmail) return PostBoardResponseDto.noExistedUserEmail();     
        
        // description : entity 생성 //
        BoardEntity boardEntity = new BoardEntity(boardWriterEmail, dto);
        
        // description : 데이터 베이스에 저장 //
        boardRepository.save(boardEntity);
        
    } catch (Exception exception) {
        exception.printStackTrace();
        return ResponseDto.databaseError();
    }
    
    return PostBoardResponseDto.success();
}

// description : 게시물 수정 //
@Override
public ResponseEntity<? super PatchBoardResponseDto> patchBoard(String boardWriterEmail, Integer boardNumber, PatchBoardRequestDto dto) {

    try {
        // description : 존재하는 유저인지 확인 //
        boolean hasUserEmail = userRepository.existsByUserEmail(boardWriterEmail);
        if(!hasUserEmail) return PatchBoardResponseDto.noExistedUserEmail();

        // description : 존재하는 게시물인지 확인 //
        BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
        if(boardEntity == null) return PatchBoardResponseDto.noExistedBoardNumber();

        // description : 작성자 이메일WriterEmail과 입력받은 이메일boardWriterEmail이 같은지 확인하기  //
        boolean equalWriterEmail = boardEntity.getBoardWriterEmail().equals(boardWriterEmail);
        if(!equalWriterEmail) return PatchBoardResponseDto.noPermisstin();

        // description : 게시물 수정 //
        boardEntity.patch(dto);

        // description : DB에 저장 //
        boardRepository.save(boardEntity);

    } catch (Exception exception) {
        exception.printStackTrace();
        return ResponseDto.databaseError();
    }
    return PatchBoardResponseDto.success();
    
    
}

// description : 게시물 삭제 //
@Override
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(String userEmail, Integer boardNumber) {

        try {
            // descriptiont: 존재하는 유저인지 확인 //
            boolean hasWriterEmail = userRepository.existsByUserEmail(userEmail);
            if(!hasWriterEmail) return DeleteBoardResponseDto.noExistedUserEmail();

            // description : 존재하는 게시물인지 확인 //
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return DeleteBoardResponseDto.noExistedBoardNumber();
            
            // description : 작성자와 입력받은 이메일이 같은지 확인 //
            boolean equalWriter = boardEntity.getBoardWriterEmail().equals(userEmail);
            if(!equalWriter) return DeleteBoardResponseDto.noPermission();

            // description : 댓글 데이터 삭제 //
            commentRepository.deleteByCommentBoardNumber(boardNumber);

            // description : 좋아요 데이터 삭제 //
            favoriteRepository.deleteByFavoriteBoardNumber(boardNumber);
            
            // description : 게시물 삭제 //
            boardRepository.delete(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return DeleteBoardResponseDto.success();
    }
    
// description : 게시물 조회 //
    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        BoardViewEntity boardViewEntity = null;

        try {
            // description : 게시물 번호로 게시글 조회 //
            boardViewEntity = boardViewRepository.findByBoardNumber(boardNumber);

            // description : 존재하는 게시물인지 확인 //
            if(boardViewEntity == null) return GetBoardResponseDto.noExistedBoardNumber();

            // description : 게시물 조회수 증가 //
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaceViewCount();

            // description : 데이터 베이스에 저장 //
            boardRepository.save(boardEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardResponseDto.success(boardViewEntity);
    }

    // description : TOP3 최신순으로 불러오기 // 
    @Override
    public ResponseEntity<? super GetTop3CurrentListResponseDto> getTop3Current() {

        List<BoardListResponseDto> top3Current = null;

        try {
            // description : 최신순으로 상위 3개 게시물 조회 //
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findTop3ByOrderByWriteDatetimeDesc();

            // description : entity를 dto형태로 변환 //
            top3Current = BoardListResponseDto.copyEntityList(boardViewEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetTop3CurrentListResponseDto.success(top3Current);

    }

    // description : TOP3 댓글순으로 불러오기 // 
    @Override
    public ResponseEntity<? super GetTop3CommentListResponseDto> getTop3Comment() {
        
        List<BoardListResponseDto> top3Comment = null;

        try {
            // description : 댓글 순으로 상위 3개 게시물 조회 //
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findTop3ByOrderByCommentCountDesc();

            // description: entity를 dto 형태로 변환 //
            top3Comment = BoardListResponseDto.copyEntityList(boardViewEntities);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetTop3CommentListResponseDto.successs(top3Comment);
    }

    // description : TOP3 좋아요순으로 불러오기 // 
    @Override
    public ResponseEntity<? super GetTop3FavoriteListResponseDto> getTop3Favorite() {

        List<BoardListResponseDto> top3Favorite = null;

        try {
            // description : 좋아요 상위 3개 게시물 조회 //
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findTop3ByOrderByFavoriteCountDesc();

            // description : entity를 dto로 변환 //
            top3Favorite = BoardListResponseDto.copyEntityList(boardViewEntities);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetTop3FavoriteListResponseDto.success(top3Favorite);
    }
    
    // description : TOP3 조회수순으로 불러오기 // 
    @Override
    public ResponseEntity<? super GetTop3ViewListResponseDto> getTop3View() {

        List<BoardListResponseDto> top3View = null;

        try {
            // description : 좋아요 상위 3개 게시물 조회 //
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findTop3ByOrderByViewCountDesc();

            // description : entity를 dto로 변환 //
            top3View = BoardListResponseDto.copyEntityList(boardViewEntities);
            
        } catch (Exception exception) {
           exception.printStackTrace();
           return ResponseDto.databaseError();
        }
        return GetTop3ViewListResponseDto.success(top3View);
        
    }

// description : 댓글 작성 //
    @Override
    public ResponseEntity<? super PostCommentResponseDto> postComment(Integer commentBoardNumber, String commentUserEmail, PostcommentRequestDto dto) {
    
        try {
            // description : 존재하는 회원인지 확인 //
            boolean hasUserEmail = userRepository.existsByUserEmail(commentUserEmail);
            if(! hasUserEmail) return PostCommentResponseDto.noExistedUserEmail();

            // description : 존재하는 게시물인지 확인 //
            BoardEntity boardEntity = boardRepository.findByBoardNumber(commentBoardNumber);
            if(boardEntity == null) return PostCommentResponseDto.noExistedBoardNumber();
            
            // description : entity 생성 //
            CommentEntity commentEntity = new CommentEntity(commentBoardNumber, commentUserEmail, dto);

            // description : comment DB 저장 //
            commentRepository.save(commentEntity);

            // description : 게시물 댓글수 증가 //
            boardEntity.increaceCommentCount();

            // description : board DB 저장  //
            boardRepository.save(boardEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostCommentResponseDto.success();

    }

// description : 좋아요 //
    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer favoriteBoardNumber, String favoriteUserEmail) {

        try {
            // description : 존재하는 회원인지 확인 //
            boolean hasUser = userRepository.existsByUserEmail(favoriteUserEmail);
            if(!hasUser) return PutFavoriteResponseDto.noExistedUserEmail();

            // description : 존재하는 게시물인지 확인 //
            BoardEntity boardEntity = boardRepository.findByBoardNumber(favoriteBoardNumber);
            if(boardEntity == null) return PutFavoriteResponseDto.noExistedBoardNumber();

            // description : 해당 유저가 해당 게시물에 좋아요 했는지 확인 //
            boolean isFavorite = favoriteRepository.existsByFavoriteUserEmailAndFavoriteBoardNumber(favoriteUserEmail, favoriteBoardNumber);

            // description : entity 생성 //
            FavoriteEntity favoriteEntity = new FavoriteEntity(favoriteBoardNumber, favoriteUserEmail);

            // description : 이미 좋아요 한 경우 //
            if(isFavorite) {
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaceFavoriteCount();
            }
            
            // description : 아직 좋아요 하지 않은 경우 //
            if(!isFavorite) {
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaceFavoriteCount();
            }
            
            // description : DB에 저장 //
            boardRepository.save(boardEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PutFavoriteResponseDto.success();
    }

// description : 특정 유저의 게시물 리스트 조회 //
    @Override
    public ResponseEntity<? super GetUserListResponseDto> getUserBoardList(String writerEmail) {
        
        List<BoardListResponseDto> boardList = null;

        try {
            // description : 특정 이메일에 해당하는 게시물 리스트 조회 //
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findByWriterEmailOrderByWriteDatetimeDesc(writerEmail);
            
            // description : entity를 dto로 변환 //
            boardList = BoardListResponseDto.copyEntityList(boardViewEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserListResponseDto.success(boardList);    
    }

// description : 특정 게시물 댓글 리스트 조회 //
    @Override
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer commentBoardNumber) {

        List<CommentListResponseDto> commentList = null;

        try {
            // description : 게시물의 댓글 리스트 조회 //
            List<CommentListResultSet> resultSets = commentRepository.getCommentList(commentBoardNumber);
            
            // description : resultSet을 dto로 변환 //
            commentList = CommentListResponseDto.copyList(resultSets);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetCommentListResponseDto.success(commentList);


    }

// description : 특정 게시물 좋아요 리스트 조회 //
    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer favoriteBoardNumber) {

        List<FavoriteListResponseDto> favoriteList = null;

        try {
            // description : 게시물의 좋아요 리스트 조회 //
            List<UserEntity> userEntities = userRepository.getFavoriteList(favoriteBoardNumber);

            // description : entity를 dto로 변환 //
            favoriteList = FavoriteListResponseDto.copyEntityList(userEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetFavoriteListResponseDto.success(favoriteList);
    }

// description : 검색 게시물 리스트 조회 //
    @Override
    public ResponseEntity<? super GetSearchBoardResponseDto> getSearchBoard(String searchWord) {

        List<BoardListResponseDto> boardList = null;

        try {
            // description : 검색어가 제목과 내용에 포함되어 있는 데이터 조회 //
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findByTitleContainsOrContentsContainsOrderByWriteDatetimeDesc(searchWord, searchWord);

            // description : entity를 dto로 변환 //
            boardList = BoardListResponseDto.copyEntityList(boardViewEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSearchBoardResponseDto.success(boardList);

    }

    @Override
    public ResponseEntity<? super GetBoardListResponseDto> getBoardList(Integer section) {

        List<BoardListResponseDto> boardList = null;

        try {
            // description: 최신 게시물 리스트 불러오기 //
            Integer limit = (section - 1) * 50;
            List<BoardListResultSet> resultSets = boardRepository.getBoardList(limit);

            // description: 검색 결과를 ResponseDto 형태로 변환 //
            boardList = BoardListResponseDto.copyList(resultSets);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetBoardListResponseDto.success(boardList);

    }

    @Override
    public ResponseEntity<? super GetBoardListResponseDto> getBoardViewList(Integer section) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getBoardViewList'");
    }

    @Override
    public ResponseEntity<? super GetBoardListResponseDto> getBoardFavoriteList(Integer section) {

        List<BoardListResponseDto> boardList= null;

        try {
            // description: 좋아요 게시물 리스트 불러오기 //
            Integer limit = (section - 1) * 50;
            List<BoardListResultSet> resultSets = boardRepository.getBoardFavoriteList(limit);

            // description: 검색 결과를 ResponseDto 형태로 변환 //
            boardList = BoardListResponseDto.copyList(resultSets);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetBoardListResponseDto.success(boardList);

    }

    @Override
    public ResponseEntity<? super GetBoardListResponseDto> getBoardCommentList(Integer section) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getBoardCommentList'");
    }

   
    
}
