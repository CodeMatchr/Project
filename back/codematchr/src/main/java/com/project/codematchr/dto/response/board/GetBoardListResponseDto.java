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
public class GetBoardListResponseDto extends ResponseDto{

    public List<BoardListResponseDto> boardList;

    public GetBoardListResponseDto(String code, String Message, List<BoardListResponseDto> boardList) {
        super(code, Message);
        this.boardList = boardList;
    }
    
    public static ResponseEntity<GetBoardListResponseDto> success(List<BoardListResponseDto> boardList) {
        GetBoardListResponseDto result = new GetBoardListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
