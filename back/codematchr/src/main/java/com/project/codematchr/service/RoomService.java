package com.project.codematchr.service;
import org.springframework.http.ResponseEntity;
import com.project.codematchr.dto.request.room.PatchRoomEntranceRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomExitRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomImageUrlRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomPasswordRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomTitleRequestDto;
import com.project.codematchr.dto.request.room.PostRoomRequestDto;
import com.project.codematchr.dto.response.room.DeleteRoomResponseDto;
import com.project.codematchr.dto.response.room.GetRoomListResponseDto;
import com.project.codematchr.dto.response.room.GetRoomResponseDto;
import com.project.codematchr.dto.response.room.GetSearchRoomResponseDto;
import com.project.codematchr.dto.response.room.GetUserRoomListResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomEntranceResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomExitResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomImageUrlResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomPasswordResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomTitleResponseDto;
import com.project.codematchr.dto.response.room.PostRoomResponseDto;

public interface RoomService {
    
    ResponseEntity<? super PostRoomResponseDto> postRoom(String userEmail, PostRoomRequestDto postRoomRequestDto);
    
    ResponseEntity<? super PatchRoomTitleResponseDto> patchRoomTitle(Integer roomNumber, String userEmail, PatchRoomTitleRequestDto patchRoomTitleRequestDto);
    
    ResponseEntity<? super PatchRoomImageUrlResponseDto> patchRoomImageUrl(Integer roomNumber, String userEmail, PatchRoomImageUrlRequestDto patchRoomImageUrlRequestDto);
    
    ResponseEntity<? super PatchRoomPasswordResponseDto> patchRoomPassword(Integer roomNumber, String userEmail, PatchRoomPasswordRequestDto patchRoomPasswordRequestDto);
    
    ResponseEntity<? super DeleteRoomResponseDto> deleteRoom(Integer roomNumber , String userEmail);
    
    ResponseEntity<? super GetRoomListResponseDto> getCurrentRoomList(Integer section);
    
    ResponseEntity<? super GetUserRoomListResponseDto> getUserRoomList(String userEmail);
    
    ResponseEntity<? super PatchRoomEntranceResponseDto> patchRoomEntrance(Integer roomNumber, String userEmail, PatchRoomEntranceRequestDto patchRoomEntranceRequestDto);  
    
    ResponseEntity<? super PatchRoomExitResponseDto> patchRoomExit(Integer roomNumber, String userEmail, PatchRoomExitRequestDto patchRoomExitRequestDto);
    
    ResponseEntity<? super GetRoomResponseDto> getRoom(Integer roomNumber, String userEmail);
    
    ResponseEntity<? super GetSearchRoomResponseDto> getSearchRoom(String searchWord);
    
}