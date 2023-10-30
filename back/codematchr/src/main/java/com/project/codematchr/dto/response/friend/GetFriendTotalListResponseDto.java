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
public class GetFriendTotalListResponseDto extends ResponseDto {
  
  public List<FriendListResponseDto> friendList;

  public GetFriendTotalListResponseDto(String code, String message, List<FriendListResponseDto> friendList) {
    super(code, message);
    this.friendList = friendList;
  }

  public static ResponseEntity<GetFriendTotalListResponseDto> success(List<FriendListResponseDto> friendList) {
    GetFriendTotalListResponseDto result = new GetFriendTotalListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, friendList);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistedUserEmail() {
    GetFriendTotalListResponseDto result = new GetFriendTotalListResponseDto(ResponseCode.NO_EXISTED_USER_EMAIL, ResponseMessage.NO_EXISTED_USER_EMAIL, null);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}
