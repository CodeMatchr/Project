export default interface PatchRoomTitleRequestDto {
    roomTitle : string;
    roomImage? : File | null;
    roomImageUrl? : string | null;
    roomPassword : string;
}