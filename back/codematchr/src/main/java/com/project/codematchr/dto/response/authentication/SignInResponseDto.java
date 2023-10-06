package com.project.codematchr.dto.response.authentication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignInResponseDto extends ResponseDto{
    private String token;
    private int expiredTime;

    private SignInResponseDto(String code , String message , String token) {
        super(code, message);
        this.token = token;
        this.expiredTime = 3600 * 5;
    }

    public static ResponseEntity<SignInResponseDto> success(String token) {
        SignInResponseDto result = new SignInResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, token);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    public static ResponseEntity<ResponseDto> signInDataMismatch() {
        ResponseDto result = new ResponseDto(ResponseCode.REQUEST_PARAMETER_VALIDATION_FAIL, ResponseMessage.REQUEST_PARAMETER_VALIDATION_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
      }

}
