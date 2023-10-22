package com.project.codematchr.dto.response.room;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.entity.RoomViewEntity;

public class GetRoomResponseDto extends ResponseDto {
    
    private int roomNumber;
    private String roomTitle;
    private String roomImageUrl;
    private String roomPassword;
    private String roomDateTime;
    private String roomManagerEmail;
    private int roomUserCount;
    private String roomManagerNickname;
    private String roomManagerProfileImageUrl;

    private GetRoomResponseDto(String code, String message, RoomViewEntity roomViewEntity) {
        super(code, message);
        this.roomNumber = roomViewEntity.getRoomNumber();
        this.roomTitle = roomViewEntity.getRoomTitle();
        this.roomImageUrl = roomViewEntity.getRoomImageUrl();
        this.roomPassword = roomViewEntity.getRoomPassword();
        this.roomDateTime = roomViewEntity.getRoomDatetime();
        this.roomManagerEmail = roomViewEntity.getRoomManagerEmail();
        this.roomUserCount = roomViewEntity.getRoomUserCount();
        this.roomManagerNickname = roomViewEntity.getRoomManagerNickname();
        this.roomManagerProfileImageUrl = roomViewEntity.getRoomManagerProfileImageUrl();
    }

    // 성공 //
    public static ResponseEntity<GetRoomResponseDto> success(RoomViewEntity roomViewEntity) {
        GetRoomResponseDto result = new GetRoomResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, roomViewEntity);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 존재하는 다인원 채팅방 인지 //
    public static ResponseEntity<ResponseDto> noExistedRoomNumber() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_BOARD_NUMBER, ResponseMessage.NO_EXISTED_ROOM_NUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 존재하는 사용자 인지 //
    public static ResponseEntity<ResponseDto> noExistedUserEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 입장하고자 하는 다인원 채팅방 비밀번호가 일치하는지 //
    public static ResponseEntity<ResponseDto> notCorrectPassword() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_CORRECT_PASSWORD, ResponseMessage.NOT_CORRECT_PASSWORD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
