package com.project.codematchr.dto.response.friend;
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
public class GetAddFriendListResponseDto extends ResponseDto {
    
    public List<FriendListResponseDto> friendList;

    public GetAddFriendListResponseDto(String code, String message,List<FriendListResponseDto> friendList ){
        super(code, message);
        this.friendList = friendList;
    }

    public static ResponseEntity<GetAddFriendListResponseDto> success(List<FriendListResponseDto> friendList){
        GetAddFriendListResponseDto result = new GetAddFriendListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, friendList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
