import ResponseDto from "../response.dto";
import RoomListResponseDto from "./room-list.response.dto";

export default interface GetCurrentRoomListResponseDto extends ResponseDto{
    roomList : RoomListResponseDto[];
}