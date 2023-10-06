package com.project.codematchr.dto.response.room;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.entity.RoomEntity;

public class GetRoomResponseDto extends ResponseDto {
    private int roomNumber;
    private String roomTitle;
    private String roomImageUrl;

    private GetRoomResponseDto(String code, String message, RoomEntity roomEntity) {
        super(code, message);
        this.roomNumber = roomEntity.getRoomNumber();
        this.roomTitle = roomEntity.getRoomTitle();
        this.roomImageUrl = roomEntity.getRoomImageUrl();
    }

    // 성공
    public static ResponseEntity<GetRoomResponseDto> success(RoomEntity roomEntity) {
        GetRoomResponseDto result = new GetRoomResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, roomEntity);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 존재하지 않는 다인원 채팅방 번호
    public static ResponseEntity<ResponseDto> noExistedRoomNumber() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_ROOM_NUMBER, ResponseMessage.NO_EXISTED_ROOM_NUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
