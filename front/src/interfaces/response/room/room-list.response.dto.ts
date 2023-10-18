export default interface RoomListResponseDto {
    roomNumber : number;
    roomTitle : string;
    roomImageUrl : string | null;
    // roomPassword : string;
    // roomDateTime : string;
    roomMemberCount : number;
    roomManagerNickname : string;
    // roomAccessorEmail : string;
    roomManagerProfileImageUrl : string | null;
    // roomIsMulti : boolean;
    userEmail : string;
} 