export default interface MessageDto {
    id: string;
    room: string;
    profileImage: string | null;
    nickname: string;
    message: string;
    datetime: string;
}