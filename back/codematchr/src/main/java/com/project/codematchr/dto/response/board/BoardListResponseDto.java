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
  private String userProfileImageUrl;
  private String userNickname;

  public BoardListResponseDto(BoardViewEntity boardViewEntity) {
    this.boardNumber = boardViewEntity.getBoardNumber();
    this.boardTitle = boardViewEntity.getTitle();
    this.boardContents = boardViewEntity.getContents();
    this.boardImageUrl = boardViewEntity.getImageUrl();
    this.boardViewCount = boardViewEntity.getViewCount();
    this.boardCommentCount = boardViewEntity.getCommentCount();
    this.boardFavoriteCount = boardViewEntity.getFavoriteCount();
    this.boardWriteDatetime = boardViewEntity.getWriteDatetime();
    this.userProfileImageUrl = boardViewEntity.getWriterProfileImageUrl();
    this.userNickname = boardViewEntity.getWriterNickname();
  }

  public static List<BoardListResponseDto> copyEntityList(List<BoardViewEntity> boardViewEntities) {
    List<BoardListResponseDto> boardList = new ArrayList<>();

    for(BoardViewEntity entity:boardViewEntities) {
      BoardListResponseDto board = new BoardListResponseDto(entity);
      boardList.add(board);
    }
    return boardList;
  }

  // 최신 게시물 조회 //
  public BoardListResponseDto(BoardListResultSet boardListResultSet) {
    this.boardNumber = boardListResultSet.getBoardNumber();
    this.boardTitle = boardListResultSet.getBoardTitle();
    this.boardContents = boardListResultSet.getBoardContents();
    this.boardImageUrl = boardListResultSet.getBoardImageUrl();
    this.boardViewCount = boardListResultSet.getBoardViewCount();
    this.boardCommentCount = boardListResultSet.getBoardCommentCount();
    this.boardFavoriteCount = boardListResultSet.getBoardFavoriteCount();
    this.boardWriteDatetime = boardListResultSet.getBoardWriteDatetime();
    this.userProfileImageUrl = boardListResultSet.getUserProfileImageUrl();
    this.userNickname = boardListResultSet.getUserNickname();
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
