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
import com.project.codematchr.service.RoomService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/create")
    public ResponseEntity<? super PostRoomResponseDto> postRoom(
        @AuthenticationPrincipal String userEmail,
        @RequestBody @Valid PostRoomRequestDto postRoomRequestDto
    ) {
        ResponseEntity<? super PostRoomResponseDto> responseEntity = roomService.postRoom(userEmail, postRoomRequestDto);
        return responseEntity;
    }
    
    @PatchMapping("/{roomNumber}/roomTitle")
    public ResponseEntity<? super PatchRoomTitleResponseDto> patchRoomTitle(
        @AuthenticationPrincipal String userEmail,
        @PathVariable("roomNumber") Integer roomNumber,
        @RequestBody @Valid PatchRoomTitleRequestDto patchRoomTitleRequestDto
    ) {
        ResponseEntity<? super PatchRoomTitleResponseDto> responseEntity = roomService.patchRoomTitle(roomNumber, userEmail, patchRoomTitleRequestDto);
        return responseEntity;
    }

    @PatchMapping("/{roomNumber}/roomImageUrl")
    public ResponseEntity<? super PatchRoomImageUrlResponseDto> patchRoomImageUrl(
        @AuthenticationPrincipal String userEmail, 
        @PathVariable("roomNumber") Integer roomNumber,
        @RequestBody @Valid PatchRoomImageUrlRequestDto patchRoomImageUrlRequestDto
    ) {
        ResponseEntity<? super PatchRoomImageUrlResponseDto> responseEntity = roomService.patchRoomImageUrl(roomNumber, userEmail, patchRoomImageUrlRequestDto);
        return responseEntity;
    }

    @PatchMapping("/{roomNumber}/roomPassword")
    public ResponseEntity<? super PatchRoomPasswordResponseDto> patchRoomPassword(
        @AuthenticationPrincipal String userEmail,
        @PathVariable("roomNumber") Integer roomNumber,
        @RequestBody @Valid PatchRoomPasswordRequestDto patchRoomPasswordRequestDto
    ) {
        ResponseEntity<? super PatchRoomPasswordResponseDto> responseEntity = roomService.patchRoomPassword(roomNumber, userEmail, patchRoomPasswordRequestDto);
        return responseEntity;
    }

    @DeleteMapping("/{roomNumber}")
    public ResponseEntity<? super DeleteRoomResponseDto> deleteRoom(
        @AuthenticationPrincipal String userEmail,
        @PathVariable("roomNumber") Integer roomNumber
    ) {
        ResponseEntity<? super DeleteRoomResponseDto> response = roomService.deleteRoom(roomNumber, userEmail);
        return response;
    }

    @GetMapping("/current-room/{section}")
    public ResponseEntity<? super GetRoomListResponseDto> getCurrentRoomList(
        @PathVariable Integer section
    ) {
        ResponseEntity<? super GetRoomListResponseDto> response = roomService.getCurrentRoomList(section);
        return response;
    }
    
    @GetMapping("/{userEmail}/my")
    public ResponseEntity<? super GetUserRoomListResponseDto> getUserRoomList(
        @AuthenticationPrincipal String userEmail
    ) {
            ResponseEntity<? super GetUserRoomListResponseDto> response = roomService.getUserRoomList(userEmail);
            return response;
    }

    @PatchMapping("/{roomNumber}/entrance")
    public ResponseEntity<? super PatchRoomEntranceResponseDto> patchRoomEntrance(
        @AuthenticationPrincipal String userEmail,
        @PathVariable("roomNumber") Integer roomNumber,
        @RequestBody @Valid PatchRoomEntranceRequestDto patchRoomEntranceRequsetDto
    ) {
        ResponseEntity<? super PatchRoomEntranceResponseDto> response = roomService.patchRoomEntrance(roomNumber, userEmail, patchRoomEntranceRequsetDto);
        return response;
    }

    @PatchMapping("/{roomNumber}/exit")
    public ResponseEntity<? super PatchRoomExitResponseDto> patchRoomExit(
        @AuthenticationPrincipal String userEmail,
        @PathVariable("roomNumber") Integer roomNumber,
        @RequestBody @Valid PatchRoomExitRequestDto patchRoomExitRequestDto
    ) {
        ResponseEntity<? super PatchRoomExitResponseDto> response = roomService.patchRoomExit(roomNumber, userEmail, patchRoomExitRequestDto);
        return response;
    }

    @GetMapping("/{roomNumber}")
    public ResponseEntity<? super GetRoomResponseDto> getRoom(
        @AuthenticationPrincipal String userEmail,
        @PathVariable("roomNumber") Integer roomNumber
    ) {
        ResponseEntity<? super GetRoomResponseDto> response = roomService.getRoom(roomNumber, userEmail);
        return response;
    }

    @GetMapping("search/{searchWord}")
    public ResponseEntity<? super GetSearchRoomResponseDto> getSearchRoom(
        @PathVariable String searchWord
    ){
        ResponseEntity<? super GetSearchRoomResponseDto> response = roomService.getSearchRoom(searchWord);
        return response;
    }
    
}
