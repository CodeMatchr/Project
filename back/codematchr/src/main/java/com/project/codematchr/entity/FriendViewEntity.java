package com.project.codematchr.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.project.codematchr.entity.pk.FriendPk;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity(name = "friend_view")
@Table(name = "friend_view")
@IdClass(FriendPk.class)
public class FriendViewEntity {
  
  @Id
  private String friendMyEmail;
  @Id
  private String friendEmail;
  private String userNickname;
  private String userStateMessage;
  private String userProfileImageUrl;

  
}
