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
public class GetTop3CurrentListResponseDto extends ResponseDto {
  
  private List<BoardListResponseDto> top3Current;

  private GetTop3CurrentListResponseDto(String code, String message, List<BoardListResponseDto> top3Current) {
    super(code, message);
    this.top3Current = top3Current;
  } 

  public static ResponseEntity<GetTop3CurrentListResponseDto> success(List<BoardListResponseDto> top3Current) {
    GetTop3CurrentListResponseDto result = new GetTop3CurrentListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, top3Current);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

}
