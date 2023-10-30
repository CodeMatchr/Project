package com.project.codematchr.dto.response.board;
import java.util.ArrayList;
import java.util.List;
import com.project.codematchr.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FavoriteListResponseDto {
  
  private String userEmail;
  private String userNickname;
  private String userProfileImageUrl;

  public FavoriteListResponseDto(UserEntity userEntity) {
    this.userEmail = userEntity.getUserEmail();
    this.userNickname = userEntity.getUserNickname();
    this.userProfileImageUrl = userEntity.getUserProfileImageUrl();
  }

  public static List<FavoriteListResponseDto> copyEntityList(List<UserEntity> userEntities) {

    List<FavoriteListResponseDto> favoriteList = new ArrayList<>();
    
    for(UserEntity userEntity:userEntities) {
      FavoriteListResponseDto favoriteItem = new FavoriteListResponseDto(userEntity);
      favoriteList.add(favoriteItem);
    }

    return favoriteList;
    
  }

}
