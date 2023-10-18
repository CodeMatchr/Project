package com.project.codematchr.dto.response.friend;

import java.util.ArrayList;
import java.util.List;

import com.project.codematchr.entity.FriendViewEntity;
import com.project.codematchr.entity.UserViewEntity;
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

   public static List<FriendListResponseDto> copyFriendList(List<FriendViewEntity> friendViewEntities) {
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

   public static List<FriendListResponseDto> copyFriendLists(List<FriendListResultSet> friendListResultSets) {
    List<FriendListResponseDto> friendList = new ArrayList<>();

    for(FriendListResultSet friendListResultSet: friendListResultSets) {
      FriendListResponseDto friend = new FriendListResponseDto(friendListResultSet);
      friendList.add(friend);
    }
    return friendList;
  }
 
    // description : 전체 친구 목록 조회  //
    public FriendListResponseDto(UserViewEntity userViewEntity) {
        this.friendEmail = userViewEntity.getUserEmail();
        this.userNickname = userViewEntity.getUserNickname();
        this.userStateMessage = userViewEntity.getUserStateMessage();
        this.userProfileImageUrl = userViewEntity.getUserProfileImageUrl();
      }

    public static List<FriendListResponseDto> copyFriendTotalList(List<UserViewEntity> userViewEntities) {
      List<FriendListResponseDto> friendList = new ArrayList<>();

      for(UserViewEntity userViewEntity:userViewEntities ) {
        FriendListResponseDto friend = new FriendListResponseDto(userViewEntity);
        friendList.add(friend);
      }
      return friendList;

  }
}
