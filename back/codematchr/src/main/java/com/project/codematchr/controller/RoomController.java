package com.project.codematchr.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.project.codematchr.service.RoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // API : 다인원 채팅방 생성 메서드 //
    @PostMapping("/create")
    public ResponseEntity<? super PostRoomResponseDto> postRoom(@PathVariable("roomUserEmail") String roomUserEmail,  @RequestBody @Valid PostRoomRequestDto postRoomRequestDto) {
        ResponseEntity<? super PostRoomResponseDto> responseEntity = roomService.postRoom(roomUserEmail, postRoomRequestDto);
        return responseEntity;
    }

    // API : 특정 다인원 채팅방 조회 메서드 //
    @GetMapping("/{roomNumber}")
    public ResponseEntity<? super GetRoomResponseDto> getRoom(@PathVariable("roomNumber") Integer roomNumber) {
        ResponseEntity<? super GetRoomResponseDto> responseEntity = roomService.getRoom(roomNumber);
        return responseEntity;
    }

    // API : 다인원 채팅방 목록 조회 메서드 //
    @GetMapping("/{roomNumber}/roomList")
    public ResponseEntity<? super GetRoomListResponseDto> getRoomList(@PathVariable("roomNumber") Integer roomNumber) {
        ResponseEntity<? super GetRoomListResponseDto> responseEntity = roomService.getRoomList(roomNumber);
        return responseEntity;
    }

    // API : 특정 다인원 채팅방 제목 수정 메서드 //
    @PatchMapping("/{roomNumber}/roomTitle")
    public ResponseEntity<? super PatchRoomTitleResponseDto> patchRoomTitle(@AuthenticationPrincipal String roomUserEmail, @PathVariable("roomNumber") Integer roomNumber, @RequestBody @Valid PatchRoomTitleRequestDto patchRoomTitleRequestDto) {
        ResponseEntity<? super PatchRoomTitleResponseDto> responseEntity = roomService.patchRoomTitle(roomNumber, roomUserEmail, patchRoomTitleRequestDto);
        return responseEntity;
    }

    // API : 특정 다인원 채팅방 이미지 수정 메서드  //
    @PatchMapping("/{roomNumber}/roomImageUrl")
    public ResponseEntity<? super PatchRoomImageUrlResponseDto> patchRoomImageUrl(@AuthenticationPrincipal String roomUserEmail, @PathVariable("roomNumber") Integer roomNumber, @RequestBody @Valid PatchRoomImageUrlRequestDto patchRoomImageUrlRequestDto) {
        ResponseEntity<? super PatchRoomImageUrlResponseDto> responseEntity = roomService.patchRoomImageUrl(roomNumber, roomUserEmail, patchRoomImageUrlRequestDto);
        return responseEntity;
    }

    // API : 특정 다인원 채팅방 비밀번호 수정 메서드 //
    @PatchMapping("/{roomNumber}/roomPassword")
    public ResponseEntity<? super PatchRoomPasswordResponseDto> patchRoomPassword(@AuthenticationPrincipal String roomUserEmail, @PathVariable("roomNumber") Integer roomNumber, @RequestBody @Valid PatchRoomPasswordRequestDto patchRoomPasswordRequestDto) {
        ResponseEntity<? super PatchRoomPasswordResponseDto> responseEntity = roomService.patchRoomPassword(roomNumber, roomUserEmail, patchRoomPasswordRequestDto);
        return responseEntity;
    }

    // API : 특정 다인원 채팅방 삭제 메서드 //
    @DeleteMapping("/{roomNumber}")
    public ResponseEntity<? super DeleteMultiChatResponseDto> deleteMultiChat(
        @AuthenticationPrincipal String room_manager_email,
        @PathVariable(value="roomNumber" , required = true) Integer roomNumber
        ) {
        ResponseEntity<? super DeleteMultiChatResponseDto> response = roomService.deleteMultiChat(roomNumber, room_manager_email);
            return response;
        }
    
}
