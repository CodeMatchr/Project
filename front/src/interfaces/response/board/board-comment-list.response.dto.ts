import ResponseDto from '../response.dto';

export interface CommentListResponseDto {
    writerProfileImage: string;
    writerNickName: string;
    writeTime: string;
    comment: string;
}