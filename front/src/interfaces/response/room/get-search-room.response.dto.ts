import ResponseDto from "../response.dto";
import RoomListResponseDto from "./room-list.response.dto";

export default interface GetSearchRoomResponseDto extends ResponseDto {
    roomList : RoomListResponseDto[];
}