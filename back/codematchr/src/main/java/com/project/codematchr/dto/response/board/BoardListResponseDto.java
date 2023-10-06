package com.project.codematchr.dto.response.board;

import java.util.ArrayList;
import java.util.List;

import com.project.codematchr.entity.BoardViewEntity;

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
    this.boardFavoriteCount = boardViewEntity.getViewCount();
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
}
