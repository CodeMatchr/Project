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
public class PatchRoomPasswordResponseDto extends ResponseDto {
    
    private PatchRoomPasswordResponseDto(String code, String message) {
        super(code, message);
    }

    // 성공
    public static ResponseEntity<PatchRoomPasswordResponseDto> success() {
        PatchRoomPasswordResponseDto result = new PatchRoomPasswordResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);
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

    // 이미 설정되어 있는 다인원 채팅방 비밀번호(기존 비밀번호)
    public static ResponseEntity<ResponseDto> existedRoomPassword() {
        ResponseDto result = new ResponseDto(ResponseCode.EXISTED_ROOM_PASSWORD, ResponseMessage.EXISTED_ROOM_PASSWORD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
    
}
