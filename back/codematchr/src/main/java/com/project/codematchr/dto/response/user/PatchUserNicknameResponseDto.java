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
public class PatchUserNicknameResponseDto extends ResponseDto {
    
    private PatchUserNicknameResponseDto(String code, String message) {
        super(code, message);
    }

    // 성공
    public static ResponseEntity<PatchUserNicknameResponseDto> success() {
        PatchUserNicknameResponseDto result = new PatchUserNicknameResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 존재하지 않는 사용자 이메일
    public static ResponseEntity<ResponseDto> noExistedUserEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    // 존재하지 않는 사용자 닉네임
    // public static ResponseEntity<ResponseDto> noExistedUserNickname() {
    //     ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_NICKNAME, ResponseMessage.NO_EXISTED_USER_NICKNAME);
    //     return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    // }

    // 존재하는 사용자 닉네임
    public static ResponseEntity<ResponseDto> existedUserNickname() {
        ResponseDto result = new ResponseDto(ResponseCode.EXISTED_USER_NICKNAME, ResponseMessage.EXISTED_USER_NICKNAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
