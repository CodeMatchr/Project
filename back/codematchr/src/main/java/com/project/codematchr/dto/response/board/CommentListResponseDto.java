package com.project.codematchr.dto.response.board;
import java.util.ArrayList;
import java.util.List;
import com.project.codematchr.entity.resultSet.CommentListResultSet;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentListResponseDto {
  
  private String nickname;
  private String contents;
  private String writeDatetime;
  private String profileImageUrl;

  public CommentListResponseDto(CommentListResultSet resultSet) {
    this.nickname = resultSet.getNickname();
    this.contents = resultSet.getContents();
    this.writeDatetime = resultSet.getWriteDatetime();
    this.profileImageUrl = resultSet.getProfileImageUrl();
  }

  public static List<CommentListResponseDto> copyList(List<CommentListResultSet> resultSets) {

    List<CommentListResponseDto> commentList = new ArrayList<>();

    for(CommentListResultSet resultSet:resultSets) {
      CommentListResponseDto commentItem = new CommentListResponseDto(resultSet);
      commentList.add(commentItem);
    }

    return commentList;
    
  }


}

