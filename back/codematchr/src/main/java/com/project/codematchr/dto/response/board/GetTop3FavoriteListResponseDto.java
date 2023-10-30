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
public class GetTop3FavoriteListResponseDto extends ResponseDto {
    
    private List<BoardListResponseDto> top3Favorite;

    private GetTop3FavoriteListResponseDto(String code, String message, List<BoardListResponseDto> top3Favorite){
        super(code, message);
        this.top3Favorite = top3Favorite;
    }

    public static ResponseEntity<GetTop3FavoriteListResponseDto> success(List<BoardListResponseDto> top3Favorite) {
        GetTop3FavoriteListResponseDto result = new GetTop3FavoriteListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, top3Favorite);
        return ResponseEntity.status(HttpStatus.OK).body(result); 
    }

}
