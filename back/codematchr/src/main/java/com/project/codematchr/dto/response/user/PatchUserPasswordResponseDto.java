package com.project.codematchr.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PatchUserPasswordResponseDto extends ResponseDto {
    
    private PatchUserPasswordResponseDto(String code, String message) {
        super(code, message);
    }

    // 성공
    public static ResponseEntity<PatchUserPasswordResponseDto> success() {
        PatchUserPasswordResponseDto result = new PatchUserPasswordResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
    // 존재하지 않는 사용자 이메일
    public static ResponseEntity<ResponseDto> noExistedUserEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 이미 설정되어 있는 비밀번호(기존 비밀번호)
    public static ResponseEntity<ResponseDto> existedUserPassword() {
        ResponseDto result = new ResponseDto(ResponseCode.EXISTED_USER_PASSWORD, ResponseMessage.EXISTED_USER_PASSWORD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
