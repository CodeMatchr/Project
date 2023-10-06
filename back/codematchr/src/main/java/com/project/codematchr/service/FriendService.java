package com.project.codematchr.service;


import org.springframework.http.ResponseEntity;

import com.project.codematchr.dto.request.friend.PostAddFriendRequestDto;
import com.project.codematchr.dto.response.friend.DeleteFriendResponseDto;
import com.project.codematchr.dto.response.friend.GetAddFriendListResponseDto;
import com.project.codematchr.dto.response.friend.GetFriendTotalListResponseDto;
import com.project.codematchr.dto.response.friend.PostAddFriendResponseDto;

public interface FriendService {
  
  // method : 친구 전체 리스트 조회 메서드 //
  ResponseEntity<? super GetFriendTotalListResponseDto> getFriendTotalList(String friendMyEmail);
  // method : 친구 추가된 리스트 조회 메서드 //
  ResponseEntity<? super GetAddFriendListResponseDto> getFriendList(String friendMyEmail);
  // method : 친구 추가 메서드 //
  ResponseEntity<? super PostAddFriendResponseDto> addFriend(String friendMyEmail, PostAddFriendRequestDto postAddFriendRequestDto);
  // method : 친구 삭제 메서드 //
  ResponseEntity<? super DeleteFriendResponseDto> deleteFriend(String friendMyEmail, String friendEmail);
}
