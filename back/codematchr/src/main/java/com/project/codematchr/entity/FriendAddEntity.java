package com.project.codematchr.entity;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import com.project.codematchr.dto.request.friend.PostAddFriendRequestDto;
import com.project.codematchr.entity.pk.FriendPk;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "friend")
@Table(name = "friend")
@IdClass(FriendPk.class)
public class FriendAddEntity {
  
  @Id
  private String friendMyEmail;

  @Id
  private String friendEmail;

  public FriendAddEntity(String friendMyEmail, PostAddFriendRequestDto postAddFriendRequestDto) {
    this.friendMyEmail = postAddFriendRequestDto.getFriendMyEmail();
    this.friendEmail = postAddFriendRequestDto.getFriendEmail();
  }

}
