package com.project.codematchr.dto.response.friend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DeleteFriendResponseDto extends ResponseDto {
    
    private DeleteFriendResponseDto(String code, String message) {
        super(code, message);
    }

    public static ResponseEntity<DeleteFriendResponseDto> success(){
        DeleteFriendResponseDto result = new DeleteFriendResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistedUserEmail(){
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    public static ResponseEntity<ResponseDto> noPermission(){
        ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
