package com.project.codematchr.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.dto.request.friend.PostAddFriendRequestDto;
import com.project.codematchr.dto.response.friend.DeleteFriendResponseDto;
import com.project.codematchr.dto.response.friend.FriendListResponseDto;
import com.project.codematchr.dto.response.friend.GetAddFriendListResponseDto;
import com.project.codematchr.dto.response.friend.GetFriendTotalListResponseDto;
import com.project.codematchr.dto.response.friend.PostAddFriendResponseDto;
import com.project.codematchr.entity.FriendAddEntity;
import com.project.codematchr.entity.FriendViewEntity;
import com.project.codematchr.repository.FriendAddRepository;
import com.project.codematchr.repository.FriendRepository;
import com.project.codematchr.repository.UserRepository;
import com.project.codematchr.service.FriendService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class FriendServicdImplement implements FriendService {

private final FriendRepository friendRepository;
private final UserRepository userRepository;
private final FriendAddRepository friendAddRepository;

  // description : 친구 전체 리스트 조회 //
  @Override
  public ResponseEntity<? super GetFriendTotalListResponseDto> getFriendTotalList(String friendMyEmail) {
  
    List<FriendListResponseDto> friendList = null;

    try {
      // description : friendMyEmail 기준으로 다른 사용자 조회 //
      List<FriendViewEntity> friendViewEntities = friendRepository.getFriendList(friendMyEmail);

      // description : 저장 //
      friendList = FriendListResponseDto.copyfriendList(friendViewEntities);

      } catch (Exception exception) {
        exception.printStackTrace();
        return ResponseDto.databaseError();
      }

      return GetFriendTotalListResponseDto.success(friendList);
    
  }

  // description : 친구 추가된 리스트 조회 //
  @Override
  public ResponseEntity<? super GetAddFriendListResponseDto> getFriendList(String friendMyEmail) {

    List<FriendListResponseDto> friendList = null;

    try {

      List<FriendViewEntity> friendViewEntities = friendRepository.findByFriendMyEmailOrderByFriendEmailDesc(friendMyEmail);
      System.out.println(friendViewEntities.toString());

      friendList = FriendListResponseDto.copyfriendList(friendViewEntities);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return GetAddFriendListResponseDto.success(friendList);

  }
  
  // description : 친구 추가 //
  @Override
  public ResponseEntity<? super PostAddFriendResponseDto> addFriend(String friendMyEmail, PostAddFriendRequestDto postAddFriendRequestDto) {

    try {

      FriendAddEntity friendEntity = new FriendAddEntity(friendMyEmail, postAddFriendRequestDto);

      friendAddRepository.save(friendEntity);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return PostAddFriendResponseDto.success();
 
  }

  // description : 친구 삭제 //
  @Override
  public ResponseEntity<? super DeleteFriendResponseDto> deleteFriend(String friendMyEmail, String friendEmail) {

    try {
      // description : 존재하는 유저(친구)인지 확인 //
      boolean hasAddFriend = friendAddRepository.existsByFriendEmail(friendEmail);
      if(!hasAddFriend) return DeleteFriendResponseDto.noExistedUserEmail();

      // description : 데이터 삭제 //
      friendAddRepository.deleteByFriendEmail(friendEmail);

      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return DeleteFriendResponseDto.success();

  }

}
