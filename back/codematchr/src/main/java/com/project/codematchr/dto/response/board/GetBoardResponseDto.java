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
    private String boardTitle;
    private String boardContents;
    private String boardImageUrl;

    private int boardViewCount;
    private int boardCommentCount;
    private int boardFavoriteCount;

    private String boardWriteDatetime;
    private String boardUserEmail;
    private String boardUserNickname;
    private String boardUserProfileImageUrl;

    private GetBoardResponseDto(String code, String message, BoardViewEntity boardViewEntity) {
        super(code, message);
        this.boardNumber = boardViewEntity.getBoardNumber();
        this.boardTitle = boardViewEntity.getBoardTitle();
        this.boardContents = boardViewEntity.getBoardContents();
        this.boardImageUrl = boardViewEntity.getBoardImageUrl();
        this.boardWriteDatetime = boardViewEntity.getBoardWriteDatetime();
        this.boardUserEmail = boardViewEntity.getUserEmail();
        this.boardUserNickname = boardViewEntity.getUserNickname();
        this.boardUserProfileImageUrl = boardViewEntity.getUserProfileImageUrl();
        this.boardViewCount = boardViewEntity.getBoardViewCount();
        this.boardCommentCount = boardViewEntity.getBoardCommentCount();
        this.boardFavoriteCount = boardViewEntity.getBoardFavoriteCount();
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
