package com.project.codematchr.service;

import org.springframework.http.ResponseEntity;

import com.project.codematchr.dto.request.room.PatchRoomImageUrlRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomPasswordRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomTitleRequestDto;
import com.project.codematchr.dto.request.room.PostRoomRequestDto;
import com.project.codematchr.dto.response.room.DeleteRoomResponseDto;
import com.project.codematchr.dto.response.room.GetCurrentRoomListResponseDto;
import com.project.codematchr.dto.response.room.GetRoomListResponseDto;
import com.project.codematchr.dto.response.room.GetUserRoomListResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomImageUrlResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomPasswordResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomTitleResponseDto;
import com.project.codematchr.dto.response.room.PostRoomResponseDto;

public interface RoomService {
    // Method : 다인원 채팅방 생성 메서드 //
    ResponseEntity<? super PostRoomResponseDto> postRoom(String userEmail, PostRoomRequestDto postRoomRequestDto);

    // Method : 특정 다인원 채팅방 제목 수정 메서드 //
    ResponseEntity<? super PatchRoomTitleResponseDto> patchRoomTitle(Integer roomNumber, String userEmail, PatchRoomTitleRequestDto patchRoomTitleRequestDto);

    // Method : 특정 다인원 채팅방 이미지 수정 메서드  //
    ResponseEntity<? super PatchRoomImageUrlResponseDto> patchRoomImageUrl(Integer roomNumber, String userEmail, PatchRoomImageUrlRequestDto patchRoomImageUrlRequestDto);

    // Method : 특정 다인원 채팅방 비밀번호 수정 메서드 //
    ResponseEntity<? super PatchRoomPasswordResponseDto> patchRoomPassword(Integer roomNumber, String userEmail, PatchRoomPasswordRequestDto patchRoomPasswordRequestDto);

    // Method : 특정 다인원 채팅방 삭제 메서드 //
    ResponseEntity<? super DeleteRoomResponseDto> deleteRoom(Integer roomNumber , String userEmail);

    // Method : 다인원 채팅방 목록 리스트 조회(최신순) //
    ResponseEntity<? super GetRoomListResponseDto> getCurrentRoomList(Integer section);

    // Method : 특정 사용자가 사용하는 다인원 채팅방 목록 리스트 조회(최신순) //
    ResponseEntity<? super GetUserRoomListResponseDto> getUserRoomList(String userEmail);
    
    
}
