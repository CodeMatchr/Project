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


    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(String boardWriterEmail, PostBoardRequestDto dto) {
        
        try {
            
            boolean hasWriterEmail = userRepository.existsByUserEmail(boardWriterEmail);
            if(!hasWriterEmail) return PostBoardResponseDto.noExistedUserEmail();     
            
            BoardEntity boardEntity = new BoardEntity(boardWriterEmail, dto);
            
            boardRepository.save(boardEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return PostBoardResponseDto.success();

    }


    @Override
    public ResponseEntity<? super PatchBoardResponseDto> patchBoard(String boardWriterEmail, Integer boardNumber, PatchBoardRequestDto dto) {

        try {
            
            boolean hasUserEmail = userRepository.existsByUserEmail(boardWriterEmail);
            if(!hasUserEmail) return PatchBoardResponseDto.noExistedUserEmail();

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return PatchBoardResponseDto.noExistedBoardNumber();
            
            boolean equalWriterEmail = boardEntity.getBoardWriterEmail().equals(boardWriterEmail);
            if(!equalWriterEmail) return PatchBoardResponseDto.noPermisstin();

            boardEntity.patch(dto);

            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchBoardResponseDto.success();
        
    }


    @Override
        public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(String userEmail, Integer boardNumber) {

            try {
            
                boolean hasWriterEmail = userRepository.existsByUserEmail(userEmail);
                if(!hasWriterEmail) return DeleteBoardResponseDto.noExistedUserEmail();
                
                BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
                if(boardEntity == null) return DeleteBoardResponseDto.noExistedBoardNumber();
                
                boolean equalWriter = boardEntity.getBoardWriterEmail().equals(userEmail);
                if(!equalWriter) return DeleteBoardResponseDto.noPermission();

                commentRepository.deleteByCommentBoardNumber(boardNumber);

                favoriteRepository.deleteByFavoriteBoardNumber(boardNumber);
                
                boardRepository.delete(boardEntity);

            } catch (Exception exception) {
                exception.printStackTrace();
                return ResponseDto.databaseError();
            }

            return DeleteBoardResponseDto.success();

        }
    
    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        BoardViewEntity boardViewEntity = null;

        try {
            
            boardViewEntity = boardViewRepository.findByBoardNumber(boardNumber);
            
            if(boardViewEntity == null) return GetBoardResponseDto.noExistedBoardNumber();
            
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaceViewCount();
            
            boardRepository.save(boardEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardResponseDto.success(boardViewEntity);

    }

    @Override
    public ResponseEntity<? super GetTop3CurrentListResponseDto> getTop3Current() {

        List<BoardListResponseDto> top3Current = null;

        try {
            
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findTop3ByOrderByBoardWriteDatetimeDesc();

            top3Current = BoardListResponseDto.copyEntityList(boardViewEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetTop3CurrentListResponseDto.success(top3Current);

    }

    @Override
    public ResponseEntity<? super GetTop3CommentListResponseDto> getTop3Comment() {
        
        List<BoardListResponseDto> top3Comment = null;

        try {
            
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findTop3ByOrderByBoardCommentCountDesc();

            top3Comment = BoardListResponseDto.copyEntityList(boardViewEntities);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetTop3CommentListResponseDto.successs(top3Comment);

    }

    
    @Override
    public ResponseEntity<? super GetTop3FavoriteListResponseDto> getTop3Favorite() {

        List<BoardListResponseDto> top3Favorite = null;

        try {
            
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findTop3ByOrderByBoardFavoriteCountDesc();

            top3Favorite = BoardListResponseDto.copyEntityList(boardViewEntities);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetTop3FavoriteListResponseDto.success(top3Favorite);

    }

    @Override
    public ResponseEntity<? super GetTop3ViewListResponseDto> getTop3View() {

        List<BoardListResponseDto> top3View = null;

        try {
            
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findTop3ByOrderByBoardViewCountDesc();
            
            top3View = BoardListResponseDto.copyEntityList(boardViewEntities);
            
        } catch (Exception exception) {
           exception.printStackTrace();
           return ResponseDto.databaseError();
        }

        return GetTop3ViewListResponseDto.success(top3View);
        
    }

    @Override
    public ResponseEntity<? super PostCommentResponseDto> postComment(Integer commentBoardNumber, String commentUserEmail, PostcommentRequestDto dto) {
    
        try {
            
            boolean hasUserEmail = userRepository.existsByUserEmail(commentUserEmail);
            if(! hasUserEmail) return PostCommentResponseDto.noExistedUserEmail();

            
            BoardEntity boardEntity = boardRepository.findByBoardNumber(commentBoardNumber);
            if(boardEntity == null) return PostCommentResponseDto.noExistedBoardNumber();
            
            
            CommentEntity commentEntity = new CommentEntity(commentBoardNumber, commentUserEmail, dto);

            
            commentRepository.save(commentEntity);

            
            boardEntity.increaceCommentCount();

            
            boardRepository.save(boardEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostCommentResponseDto.success();

    }

    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer favoriteBoardNumber, String favoriteUserEmail) {

        try {
            
            boolean hasUser = userRepository.existsByUserEmail(favoriteUserEmail);
            if(!hasUser) return PutFavoriteResponseDto.noExistedUserEmail();
          
            BoardEntity boardEntity = boardRepository.findByBoardNumber(favoriteBoardNumber);
            if(boardEntity == null) return PutFavoriteResponseDto.noExistedBoardNumber();
            
            boolean isFavorite = favoriteRepository.existsByFavoriteUserEmailAndFavoriteBoardNumber(favoriteUserEmail, favoriteBoardNumber);
            
            FavoriteEntity favoriteEntity = new FavoriteEntity(favoriteBoardNumber, favoriteUserEmail);
            
            if(isFavorite) {
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaceFavoriteCount();
            }
            
            if(!isFavorite) {
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaceFavoriteCount();
            }
            
            boardRepository.save(boardEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PutFavoriteResponseDto.success();

    }

    @Override
    public ResponseEntity<? super GetUserListResponseDto> getUserBoardList(String writerEmail) {
        
        List<BoardListResponseDto> boardList = null;

        try {

            List<BoardViewEntity> boardViewEntities = boardViewRepository.findByUserEmailOrderByBoardWriteDatetimeDesc(writerEmail);
                       
            boardList = BoardListResponseDto.copyEntityList(boardViewEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserListResponseDto.success(boardList);    

    }


    @Override
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer commentBoardNumber) {

        List<CommentListResponseDto> commentList = null;

        try {
            
            List<CommentListResultSet> resultSets = commentRepository.getCommentList(commentBoardNumber);
            
            commentList = CommentListResponseDto.copyList(resultSets);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetCommentListResponseDto.success(commentList);

    }

    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer favoriteBoardNumber) {

        List<FavoriteListResponseDto> favoriteList = null;

        try {
            
            List<UserEntity> userEntities = userRepository.getFavoriteList(favoriteBoardNumber);

            favoriteList = FavoriteListResponseDto.copyEntityList(userEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetFavoriteListResponseDto.success(favoriteList);

    }


    @Override
    public ResponseEntity<? super GetSearchBoardResponseDto> getSearchBoard(String searchWord) {

        List<BoardListResponseDto> boardList = null;

        try {
            
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findByBoardTitleContainsOrBoardContentsContainsOrderByBoardWriteDatetimeDesc(searchWord, searchWord);

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
            
            Integer limit = (section - 1) * 50;
            List<BoardListResultSet> resultSets = boardRepository.getBoardList(limit);

            boardList = BoardListResponseDto.copyList(resultSets);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardListResponseDto.success(boardList);

    }
    
    @Override
    public ResponseEntity<? super GetBoardListResponseDto> getBoardViewList(Integer section){

        List<BoardListResponseDto> boardList= null;

        try {
            
            Integer limit = (section - 1) * 50;
            List<BoardListResultSet> resultSets = boardRepository.getBoardViewList(limit);
            
            boardList = BoardListResponseDto.copyList(resultSets);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardListResponseDto.success(boardList);

    }

    @Override
    public ResponseEntity<? super GetBoardListResponseDto> getBoardFavoriteList(Integer section) {

        List<BoardListResponseDto> boardList= null;

        try {
            
            Integer limit = (section - 1) * 50;

            List<BoardListResultSet> resultSets = boardRepository.getBoardFavoriteList(limit);
            
            boardList = BoardListResponseDto.copyList(resultSets);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardListResponseDto.success(boardList);

    }
    
    @Override
    public ResponseEntity<? super GetBoardListResponseDto> getBoardCommentList(Integer section) {

        List<BoardListResponseDto> boardList= null;

        try {
            
            Integer limit = (section - 1) * 50;
            List<BoardListResultSet> resultSets = boardRepository.getBoardCommentList(limit);

            
            boardList = BoardListResponseDto.copyList(resultSets);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardListResponseDto.success(boardList);

    }

}
