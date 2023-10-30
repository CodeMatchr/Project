package com.project.codematchr.dto.response.room;
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
public class GetSearchRoomResponseDto extends ResponseDto {

    private List<RoomListResponseDto> roomList;

    private GetSearchRoomResponseDto(String code, String message, List<RoomListResponseDto> roomList) {
        super(code, message);
        this.roomList = roomList;
    }

    public static ResponseEntity<GetSearchRoomResponseDto> success(List<RoomListResponseDto> roomList) {
        GetSearchRoomResponseDto result = new GetSearchRoomResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, roomList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
}
