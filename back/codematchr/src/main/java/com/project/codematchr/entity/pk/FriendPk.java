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
public class FriendPk implements Serializable{
  
  @Column(name = "friend_my_email")
  private String friendMyEmail;
  
  @Column(name = "friend_email")
  private String friendEmail;

}
