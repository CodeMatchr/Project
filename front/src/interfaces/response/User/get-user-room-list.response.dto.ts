import ResponseDto from "../response.dto";
import RoomListResponseDto from "../room/room-list.response.dto";

export default interface GetUserRoomListResponseDto extends ResponseDto {
    roomList : RoomListResponseDto[];
}