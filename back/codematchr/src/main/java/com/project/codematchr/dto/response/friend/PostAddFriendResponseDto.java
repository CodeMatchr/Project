package com.project.codematchr.dto.response.friend;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostAddFriendResponseDto extends ResponseDto {
    
    public PostAddFriendResponseDto(String code, String message) {
        super(code, message);
    }

    public static ResponseEntity<PostAddFriendResponseDto> success() {
        PostAddFriendResponseDto result = new PostAddFriendResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistedUserEmail() {
        PostAddFriendResponseDto result = new PostAddFriendResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
