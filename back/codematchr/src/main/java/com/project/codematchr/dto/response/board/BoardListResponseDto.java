package com.project.codematchr.dto.response.board;
import java.util.ArrayList;
import java.util.List;
import com.project.codematchr.entity.BoardViewEntity;
import com.project.codematchr.entity.resultSet.BoardListResultSet;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardListResponseDto {
  
  private int boardNumber; 
  private String boardTitle; 
  private String boardContents;
  private String boardImageUrl;
  private int boardViewCount; 
  private int boardCommentCount; 
  private int boardFavoriteCount; 
  private String boardWriteDatetime;
  private String boardUserProfileImageUrl;
  private String boardUserNickname;

  public BoardListResponseDto(BoardViewEntity boardViewEntity) {
    this.boardNumber = boardViewEntity.getBoardNumber();
    this.boardTitle = boardViewEntity.getBoardTitle();
    this.boardContents = boardViewEntity.getBoardContents();
    this.boardImageUrl = boardViewEntity.getBoardImageUrl();
    this.boardViewCount = boardViewEntity.getBoardViewCount();
    this.boardCommentCount = boardViewEntity.getBoardCommentCount();
    this.boardFavoriteCount = boardViewEntity.getBoardFavoriteCount();
    this.boardWriteDatetime = boardViewEntity.getBoardWriteDatetime();
    this.boardUserProfileImageUrl = boardViewEntity.getUserProfileImageUrl();
    this.boardUserNickname = boardViewEntity.getUserNickname();
  }

  public static List<BoardListResponseDto> copyEntityList(List<BoardViewEntity> boardViewEntities) {
    List<BoardListResponseDto> boardList = new ArrayList<>();

    for(BoardViewEntity entity:boardViewEntities) {
      BoardListResponseDto board = new BoardListResponseDto(entity);
      boardList.add(board);
    }
    return boardList;
  }

  public BoardListResponseDto(BoardListResultSet boardListResultSet) {
    this.boardNumber = boardListResultSet.getBoardNumber();
    this.boardTitle = boardListResultSet.getBoardTitle();
    this.boardContents = boardListResultSet.getBoardContents();
    this.boardImageUrl = boardListResultSet.getBoardImageUrl();
    this.boardViewCount = boardListResultSet.getBoardViewCount();
    this.boardCommentCount = boardListResultSet.getBoardCommentCount();
    this.boardFavoriteCount = boardListResultSet.getBoardFavoriteCount();
    this.boardWriteDatetime = boardListResultSet.getBoardWriteDatetime();
    this.boardUserProfileImageUrl = boardListResultSet.getUserProfileImageUrl();
    this.boardUserNickname = boardListResultSet.getUserNickname();
  }

  public static List<BoardListResponseDto> copyList(List<BoardListResultSet> boardListResultSets) {
    List<BoardListResponseDto> boardList = new ArrayList<>();

    for(BoardListResultSet resultSet:boardListResultSets) {
      BoardListResponseDto board = new BoardListResponseDto(resultSet);
      boardList.add(board);
    }
    return boardList;
  }
  
}
