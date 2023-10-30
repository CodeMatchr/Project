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
