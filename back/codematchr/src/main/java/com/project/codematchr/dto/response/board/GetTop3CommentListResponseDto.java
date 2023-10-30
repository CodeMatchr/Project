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
public class GetTop3CommentListResponseDto extends ResponseDto {
    
    private List<BoardListResponseDto> top3Comment;

    private GetTop3CommentListResponseDto(String code, String message, List<BoardListResponseDto> top3Comment) {
        super(code, message);
        this.top3Comment = top3Comment;
    }

    public static ResponseEntity<GetTop3CommentListResponseDto> successs(List<BoardListResponseDto> top3Comment) {
        GetTop3CommentListResponseDto result = new GetTop3CommentListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, top3Comment);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
