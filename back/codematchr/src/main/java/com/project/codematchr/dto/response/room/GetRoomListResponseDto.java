package com.project.codematchr.dto.response.room;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetRoomListResponseDto extends ResponseDto {

    public List<RoomListResponseDto> roomList;

    public GetRoomListResponseDto(String code, String message, List<RoomListResponseDto> roomList) {
        super(code, message);
        this.roomList = roomList;
    }

    public static ResponseEntity<GetRoomListResponseDto> success(List<RoomListResponseDto> roomList) {
        GetRoomListResponseDto result = new GetRoomListResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, roomList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}


