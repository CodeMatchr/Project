package com.project.codematchr.dto.response.user;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetUserRoomListResponseDto extends ResponseDto{

    private List<UserRoomListResponseDto> roomList;

    private GetUserRoomListResponseDto(String code, String message, List<UserRoomListResponseDto> roomList) {
        super(code, message);
        this.roomList = roomList;
    }

    public static ResponseEntity<GetUserRoomListResponseDto> success(List<UserRoomListResponseDto> roomList) {
        GetUserRoomListResponseDto result = new GetUserRoomListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, roomList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
}