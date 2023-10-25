import ResponseDto from "../response.dto";

export default interface GetRoomResponseDto extends ResponseDto {
    roomNumber : number;
    roomTitle : string;
    roomImage : File | null;
    roomImageUrl : string | null;
    roomPassword : string;
    roomDateTime : string;
    roomManagerEmail : string;
    roomUserCount : number;
    roomManagerNickname : string;
    roomManagerProfileImageUrl : string | null;
}