package com.project.codematchr.entity.resultSet;

public interface BoardListResultSet {
    
    int getBoardNumber();
    String getBoardTitle();
    String getBoardContents();
    String getBoardImageUrl();
    int getBoardViewCount();
    int getBoardCommentCount();
    int getBoardFavoriteCount();
    String getBoardWriteDatetime();
    String getUserProfileImageUrl();
    String getUserNickname();

}
