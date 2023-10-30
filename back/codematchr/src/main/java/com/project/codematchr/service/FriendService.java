package com.project.codematchr.service;
import org.springframework.http.ResponseEntity;
import com.project.codematchr.dto.request.friend.PostAddFriendRequestDto;
import com.project.codematchr.dto.response.friend.DeleteFriendResponseDto;
import com.project.codematchr.dto.response.friend.GetAddFriendListResponseDto;
import com.project.codematchr.dto.response.friend.GetFriendTotalListResponseDto;
import com.project.codematchr.dto.response.friend.PostAddFriendResponseDto;

public interface FriendService {

  ResponseEntity<? super GetFriendTotalListResponseDto> getFriendTotalList(String friendMyEmail);

  ResponseEntity<? super GetAddFriendListResponseDto> getFriendList(String friendMyEmail);

  ResponseEntity<? super PostAddFriendResponseDto> addFriend(String friendMyEmail, PostAddFriendRequestDto postAddFriendRequestDto);

  ResponseEntity<? super DeleteFriendResponseDto> deleteFriend(String friendMyEmail, String friendEmail);

}
