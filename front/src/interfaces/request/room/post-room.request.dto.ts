export default interface PostRoomRequestDto {
    roomTitle : string;
    roomImage? : File | null;
    roomImageUrl? : string | null;
    roomPassword : string;
}