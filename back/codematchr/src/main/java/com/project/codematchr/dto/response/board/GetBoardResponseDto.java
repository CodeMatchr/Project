package com.project.codematchr.dto.response.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.entity.BoardViewEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetBoardResponseDto extends ResponseDto{
    
    private int boardNumber;
    private String title;
    private String contents;
    private String imageUrl;
    private String writeDatetime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImageUrl;

    private GetBoardResponseDto(String code, String message, BoardViewEntity boardViewEntity) {
        super(code, message);
        this.boardNumber = boardViewEntity.getBoardNumber();
        this.title = boardViewEntity.getTitle();
        this.contents = boardViewEntity.getContents();
        this.imageUrl = boardViewEntity.getImageUrl();
        this.writeDatetime = boardViewEntity.getWriteDatetime();
        this.writerEmail = boardViewEntity.getWriterEmail();
        this.writerNickname = boardViewEntity.getWriterNickname();
        this.writerProfileImageUrl = boardViewEntity.getWriterProfileImageUrl();
    }

    public static ResponseEntity<GetBoardResponseDto> success(BoardViewEntity boardViewEntity) {
        GetBoardResponseDto result = new GetBoardResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardViewEntity);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistedBoardNumber() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_BOARD_NUMBER, ResponseMessage.NO_EXISTED_BOARD_NUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
