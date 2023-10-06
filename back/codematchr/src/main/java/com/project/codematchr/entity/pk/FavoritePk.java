package com.project.codematchr.entity.pk;

import java.io.Serializable;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoritePk implements Serializable{
  @Column(name = "favorite_board_number")
  private int favoriteBoardNumber;
  @Column(name = "favorite_user_email")
  private String favoriteUserEmail;
}



// description : Favorite을 Pk class로 만든 이유는 FavoriteRepository에서 JpaRespository<FavoriteEntity, [기본키가 두가지여서 class로 둘다 받기 위해서]>