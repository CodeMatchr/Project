import ResponseDto from "../response.dto";
import RoomListResponseDto from "./room-list.response.dto";

export default interface GetRoomListResponseDto extends ResponseDto{
    roomList : RoomListResponseDto[];
}