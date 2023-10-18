export default interface PatchRoomRequestDto {
    roomTitle : string;
    roomImage? : File | null;
    roomImageUrl? : string | null;
    roomPassword : string;
}