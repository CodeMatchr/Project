import ResponseDto from '../response.dto';

export interface CommentListResponseDto {
    writerProfileImage: string;
    writerNickName: string;
    writeDateTime: string;
    comment: string;
}