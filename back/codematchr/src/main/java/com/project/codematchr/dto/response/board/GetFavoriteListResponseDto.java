package com.project.codematchr.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetFavoriteListResponseDto extends ResponseDto {
  
  private List<FavoriteListResponseDto> favoriteList;

  private GetFavoriteListResponseDto(String code, String message, List<FavoriteListResponseDto> favoriteList) {
    super(code, message);
    this.favoriteList = favoriteList;
  }

  public static ResponseEntity<GetFavoriteListResponseDto> success(List<FavoriteListResponseDto> favoriteList) {
    GetFavoriteListResponseDto result = new GetFavoriteListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, favoriteList);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

}
