package com.project.codematchr.service;

import org.springframework.http.ResponseEntity;

import com.project.codematchr.dto.request.room.PatchRoomImageUrlRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomPasswordRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomTitleRequestDto;
import com.project.codematchr.dto.request.room.PostRoomRequestDto;
import com.project.codematchr.dto.response.room.DeleteMultiChatResponseDto;
import com.project.codematchr.dto.response.room.GetRoomResponseDto;
import com.project.codematchr.dto.response.room.GetRoomListResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomImageUrlResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomPasswordResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomTitleResponseDto;
import com.project.codematchr.dto.response.room.PostRoomResponseDto;

public interface RoomService {
    // Method : 다인원 채팅방 생성 메서드 //
    ResponseEntity<? super PostRoomResponseDto> postRoom(String roomUserEmail, PostRoomRequestDto postRoomRequestDto);

    // Method : 특정 다인원 채팅방 조회 메서드 //
    ResponseEntity<? super GetRoomResponseDto> getRoom(Integer roomNumber);

    // Method : 다인원 채팅방 목록 조회 메서드 //
    // ResponseEntity<? super GetRoomListResponseDto> getRoomList(Integer roomNumber);

   
    
    // Method : 특정 다인원 채팅방 제목 수정 메서드 //
    ResponseEntity<? super PatchRoomTitleResponseDto> patchRoomTitle(Integer roomNumber, String roomUserEmail, PatchRoomTitleRequestDto patchRoomTitleRequestDto);

    // Method : 특정 다인원 채팅방 이미지 수정 메서드  //
    ResponseEntity<? super PatchRoomImageUrlResponseDto> patchRoomImageUrl(Integer roomNumber, String roomUserEmail, PatchRoomImageUrlRequestDto patchRoomImageUrlRequestDto);

    // Method : 특정 다인원 채팅방 비밀번호 수정 메서드 //
    ResponseEntity<? super PatchRoomPasswordResponseDto> patchRoomPassword(Integer roomNumber, String roomUserEmail, PatchRoomPasswordRequestDto patchRoomPasswordRequestDto);

    // Method : 특정 다인원 채팅방 삭제 메서드 //
    ResponseEntity<? super DeleteMultiChatResponseDto> deleteMultiChat(Integer roomNumber , String room_manager_email);
}
