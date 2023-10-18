package com.project.codematchr.dto.response.user;

import java.util.ArrayList;
import java.util.List;

import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.entity.BoardViewEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserBoardListResponseDto extends ResponseDto {
    private int boardNumber;
    private String boardTitle;
    private String boardContents;
    private String boardImageUrl;
    private int boardViewCount;
    private int boardCommentCount;
    private int boardFavoriteCount;

    private String boardWriteDatetime;
    private String boardWriterNickname;
    private String boardWriterProfileImageUrl;


    public UserBoardListResponseDto(BoardViewEntity boardViewEntity) {
        this.boardNumber = boardViewEntity.getBoardNumber();
        this.boardTitle = boardViewEntity.getTitle();
        this.boardContents = boardViewEntity.getContents();
        this.boardImageUrl = boardViewEntity.getImageUrl();
        this.boardViewCount = boardViewEntity.getViewCount();
        this.boardCommentCount = boardViewEntity.getCommentCount();
        this.boardFavoriteCount = boardViewEntity.getFavoriteCount();
        this.boardWriteDatetime = boardViewEntity.getWriteDatetime();
        this.boardWriterNickname = boardViewEntity.getWriterNickname();
        this.boardWriterProfileImageUrl = boardViewEntity.getWriterProfileImageUrl();
    }
    public static List<UserBoardListResponseDto> copyUserBoardList(List<BoardViewEntity> boardViewEntities){
        List<UserBoardListResponseDto> boardList = new ArrayList<>();

        for(BoardViewEntity entity:boardViewEntities) {
            UserBoardListResponseDto board = new UserBoardListResponseDto(entity);
            boardList.add(board);
        }
        return boardList;
    }
}
