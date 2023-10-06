package com.project.codematchr.dto.response.friend;

import java.util.ArrayList;
import java.util.List;

import com.project.codematchr.entity.FriendViewEntity;
import com.project.codematchr.entity.resultSet.FriendListResultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FriendListResponseDto {

  private String friendEmail;
  private String userNickname;
  private String userStateMessage;
  private String userProfileImageUrl;

  public FriendListResponseDto(FriendViewEntity friendViewEntity) {
    this.friendEmail = friendViewEntity.getFriendEmail();
    this.userNickname = friendViewEntity.getUserNickname();
    this.userStateMessage = friendViewEntity.getUserStateMessage();
    this.userProfileImageUrl = friendViewEntity.getUserProfileImageUrl();
  }

   public static List<FriendListResponseDto> copyfriendList(List<FriendViewEntity> friendViewEntities) {
    List<FriendListResponseDto> friendList = new ArrayList<>();

    for(FriendViewEntity friendViewEntity: friendViewEntities) {
      System.out.println(friendViewEntity.toString());
      FriendListResponseDto friend = new FriendListResponseDto(friendViewEntity);
      friendList.add(friend);
    }
    return friendList;
  }

  public FriendListResponseDto(FriendListResultSet friendListResultSet) {
    this.friendEmail = friendListResultSet.getFriendEmail();
    this.userNickname = friendListResultSet.getUserNickname();
    this.userStateMessage = friendListResultSet.getUserStateMessage();
    this.userProfileImageUrl = friendListResultSet.getUserProfileImageUrl();
  }

   public static List<FriendListResponseDto> copyfriendLists(List<FriendListResultSet> friendListResultSets) {
    List<FriendListResponseDto> friendList = new ArrayList<>();

    for(FriendListResultSet friendListResultSet: friendListResultSets) {
      FriendListResponseDto friend = new FriendListResponseDto(friendListResultSet);
      friendList.add(friend);
    }
    return friendList;
  }
 

}

