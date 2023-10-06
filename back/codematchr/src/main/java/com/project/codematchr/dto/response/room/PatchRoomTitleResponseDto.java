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
public class PatchRoomTitleResponseDto extends ResponseDto {

    private PatchRoomTitleResponseDto(String code, String message) {
        super(code, message);
    }

    // 성공
    public static ResponseEntity<PatchRoomTitleResponseDto> success() {
        PatchRoomTitleResponseDto result = new PatchRoomTitleResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 존재하지 않는 사용자 이메일
    public static ResponseEntity<ResponseDto> noExistedUserEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 존재하지 않는 다인원 채팅방 번호
    public static ResponseEntity<ResponseDto> noExistedRoomNumber() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_ROOM_NUMBER, ResponseMessage.NO_EXISTED_ROOM_NUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 권한 없음(다인원 채팅방을 생성한 사용자 이메일과 입력받은 사용자 이메일이 일치하는지 확인)
    public static ResponseEntity<ResponseDto> noPermission() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 이미 설정되어 있는 다인원 채팅방 제목(기존 다인원 채팅방 제목)
    public static ResponseEntity<ResponseDto> existedRoomTitle() {
        ResponseDto result = new ResponseDto(ResponseCode.EXISTED_ROOM_TITLE, ResponseMessage.EXISTED_ROOM_TITLE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
    
}
