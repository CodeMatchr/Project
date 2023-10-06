package com.project.codematchr.dto.response.room;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.entity.RoomEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetRoomListResponseDto extends ResponseDto {
    
    private int roomNumber;
    private String roomTitle;
    private String roomImageUrl;

     private GetRoomListResponseDto(String code, String message, RoomEntity roomEntity) {
        super(code, message);
        this.roomNumber = roomEntity.getRoomNumber();
        this.roomTitle = roomEntity.getRoomTitle();
        this.roomImageUrl = roomEntity.getRoomImageUrl();
    }

     // 성공
    public static ResponseEntity<GetRoomListResponseDto> success(RoomEntity roomEntity) {
        GetRoomListResponseDto result = new GetRoomListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, roomEntity);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}


