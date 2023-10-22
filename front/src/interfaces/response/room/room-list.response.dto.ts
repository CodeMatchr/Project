export default interface RoomListResponseDto {
    roomNumber : number;
    roomTitle : string;
    roomImageUrl : string | null;
    roomPassword : string;
    roomDateTime : string;
    roomUserCount : number;

    roomManagerEmail : string;
    roomManagerNickname : string;
    roomManagerProfileImageUrl : string | null;
    
    userEmail : string;
} 