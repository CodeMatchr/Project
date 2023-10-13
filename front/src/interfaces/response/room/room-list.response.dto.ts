export default interface RoomListResponseDto {
    roomNumber : number;
    roomTitle : string;
    roomImageUrl : string | null;
    roomMemberCount : number;
    
    roomManagerNickname : string;
    roomManagerProfileImageUrl : string | null;
}