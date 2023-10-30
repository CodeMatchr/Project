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
public class GetTop3ViewListResponseDto extends ResponseDto {
  
  private List<BoardListResponseDto> top3View;

  private GetTop3ViewListResponseDto(String code, String message, List<BoardListResponseDto> top3View) {
    super(code, message);
    this.top3View = top3View;
  }

  public static ResponseEntity<GetTop3ViewListResponseDto> success(List<BoardListResponseDto> top3View){
    GetTop3ViewListResponseDto result = new GetTop3ViewListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, top3View);
    return ResponseEntity.status(HttpStatus.OK).body(result); 

  }

}
