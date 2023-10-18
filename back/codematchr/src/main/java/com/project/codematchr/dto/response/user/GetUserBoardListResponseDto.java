package com.project.codematchr.dto.response.user;

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
public class GetUserBoardListResponseDto extends ResponseDto{

    private List<UserBoardListResponseDto> boardList;

    private GetUserBoardListResponseDto(String code, String message, List<UserBoardListResponseDto> boardList) {
        super(code, message);
        this.boardList = boardList;
    }

    public static ResponseEntity<GetUserBoardListResponseDto> success(List<UserBoardListResponseDto> boardList) {
        GetUserBoardListResponseDto result = new GetUserBoardListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
}
