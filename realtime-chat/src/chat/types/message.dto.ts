export default interface MessageDto {
    id: string;
    room: string;
    profileImage: string | null;
    userNickname: string;
    message: string;
    datetime: string;
}