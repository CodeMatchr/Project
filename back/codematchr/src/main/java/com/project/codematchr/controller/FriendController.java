package com.project.codematchr.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.codematchr.dto.request.friend.PostAddFriendRequestDto;
import com.project.codematchr.dto.response.friend.DeleteFriendResponseDto;
import com.project.codematchr.dto.response.friend.GetAddFriendListResponseDto;
import com.project.codematchr.dto.response.friend.GetFriendTotalListResponseDto;
import com.project.codematchr.dto.response.friend.PostAddFriendResponseDto;
import com.project.codematchr.service.FriendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/friend")
@RequiredArgsConstructor
public class FriendController {

  private final FriendService friendService;
  
  // API : 친구 전체 리스트 조회 //
  @GetMapping("/{friendMyEmail}")
  public ResponseEntity<? super GetFriendTotalListResponseDto> getFriendTotalList(
    @AuthenticationPrincipal String friendMyEmail
  ){
    ResponseEntity<? super GetFriendTotalListResponseDto> response = friendService.getFriendTotalList(friendMyEmail);
    return response;
  }

  // API : 친구 추가된 리스트 조회 //
  @GetMapping("/list/{friendMyEmail}")
  public ResponseEntity<? super GetAddFriendListResponseDto> getFriendList(
    @AuthenticationPrincipal String friendMyEmail
    ){
    ResponseEntity<? super GetAddFriendListResponseDto> response = friendService.getFriendList(friendMyEmail);
    return response;
  }

  // API : 친구 추가 //
  @PostMapping("/{friendMyEmail}/addFriend")
  public ResponseEntity<? super PostAddFriendResponseDto> addFriend(
    @AuthenticationPrincipal String friendMyEmail,
    @RequestBody @Valid PostAddFriendRequestDto requestbody
  ){
    ResponseEntity<? super PostAddFriendResponseDto> response = friendService.addFriend(friendMyEmail, requestbody);
    return response;
  }

  // API : 친구 삭제 //
  @DeleteMapping("/{friendMyEmail}/{friendEmail}")
  public ResponseEntity<? super DeleteFriendResponseDto> deleteFriend(
    @AuthenticationPrincipal String friendMyEmail,
    @PathVariable String friendEmail
  ){
    ResponseEntity <? super DeleteFriendResponseDto> response = friendService.deleteFriend(friendMyEmail, friendEmail);
    return response;
  }


}
