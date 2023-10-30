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
public class SignUpResponseDto extends ResponseDto {
    
    private SignUpResponseDto (String code , String message) {
        super(code , message);
    }

    public static ResponseEntity<SignUpResponseDto> success() {
        SignUpResponseDto result = new SignUpResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);   
    }

     public static ResponseEntity<ResponseDto> requestParameterValidationFailed() {
        ResponseDto result = new ResponseDto(ResponseCode.REQUEST_PARAMETER_VALIDATION_FAIL, ResponseMessage.REQUEST_PARAMETER_VALIDATION_FAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    public static ResponseEntity<ResponseDto> existedUserEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.EXISTED_USER_EMAIL, ResponseMessage.EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

      public static ResponseEntity<ResponseDto> existedUserNickname() {
        ResponseDto result = new ResponseDto(ResponseCode.EXISTED_USER_NICKNAME, ResponseMessage.EXISTED_USER_NICKNAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

      public static ResponseEntity<ResponseDto> existedUserTelnumber() {
        ResponseDto result = new ResponseDto(ResponseCode.EXISTED_USER_TELNUMBER, ResponseMessage.EXISTED_USER_TELNUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

       
}

  