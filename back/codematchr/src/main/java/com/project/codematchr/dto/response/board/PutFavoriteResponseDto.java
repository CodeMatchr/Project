package com.project.codematchr.dto.response.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PutFavoriteResponseDto  extends ResponseDto {
  
  private PutFavoriteResponseDto(String code, String message) {
    super(code, message);
  }

  public static ResponseEntity<PutFavoriteResponseDto> success() {
    PutFavoriteResponseDto result = new PutFavoriteResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistedUserEmail() {
    ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistedBoardNumber() {
    ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_BOARD_NUMBER, ResponseMessage.NO_EXISTED_BOARD_NUMBER);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}
