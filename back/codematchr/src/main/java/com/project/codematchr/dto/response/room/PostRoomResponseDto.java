package com.project.codematchr.dto.response.room;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostRoomResponseDto extends ResponseDto {

    private Integer roomNumber;
    
    private PostRoomResponseDto(String code, String message, Integer roomNumber) {
        super(code, message);
        this.roomNumber = roomNumber;
    }

    public static ResponseEntity<PostRoomResponseDto> success(Integer roomNumber) {
        PostRoomResponseDto result = new PostRoomResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, roomNumber);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistedUserEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
