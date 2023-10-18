import ResponseDto from "../response.dto";

export default interface GetRoomResponseDto extends ResponseDto {
    roomNumber : number;
    roomTitle : string;
    roomImage : File | null;
    roomImageUrl : string | null;
    roomCreatePassword : string;
    roomPassword : string;
    roomDateTime : string;
    roomMemberCount : number;
    roomUserEmail : String;
    roomManagerNickname : string;
    roomAccessorEmail : string;
    roomManagerProfileImageUrl : string | null;
    roomIsMulti : boolean;
}