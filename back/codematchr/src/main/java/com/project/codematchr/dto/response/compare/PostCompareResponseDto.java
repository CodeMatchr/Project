package com.project.codematchr.dto.response.compare;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

public class PostCompareResponseDto extends ResponseDto {
    
    private PostCompareResponseDto(String code, String message) {
        super(code, message);
    }

    // 성공
    public static ResponseEntity<PostCompareResponseDto> success() {
        PostCompareResponseDto result = new PostCompareResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 존재하지 않는 사용자 이메일
    public static ResponseEntity<ResponseDto> noExistedUserEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
