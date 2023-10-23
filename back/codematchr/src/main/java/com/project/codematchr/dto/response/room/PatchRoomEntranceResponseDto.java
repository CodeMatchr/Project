package com.project.codematchr.dto.response.room;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PatchRoomEntranceResponseDto extends ResponseDto {
    
    private PatchRoomEntranceResponseDto (String code, String message) {
        super(code, message);
    }

    // 성공 //
    public static ResponseEntity<PatchRoomEntranceResponseDto> success() {
        PatchRoomEntranceResponseDto result = new PatchRoomEntranceResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 존재하는 사용자 인지 //
    public static ResponseEntity<ResponseDto> noExistedUserEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 이미 존재하는 사용자 인지//
    public static ResponseEntity<ResponseDto> existedUserEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.EXISTED_USER_EMAIL, ResponseMessage.EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 존재하는 다인원 채팅방 인지 //
    public static ResponseEntity<ResponseDto> noExistedRoomNumber() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_BOARD_NUMBER, ResponseMessage.NO_EXISTED_ROOM_NUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 입장하고자 하는 다인원 채팅방 비밀번호가 일치하는지 //
    public static ResponseEntity<ResponseDto> notCorrectPassword() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_CORRECT_PASSWORD, ResponseMessage.NOT_CORRECT_PASSWORD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 권한 없음(다인원 채팅방을 생성한 사용자 이메일과 입력받은 사용자 이메일이 일치하는지 확인)
    public static ResponseEntity<ResponseDto> noPermission() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
    }





}
