export default interface BoardListResponseDto {
    boardNumber : number;
    boardTitle : string;
    boardContents : string;
    boardImageUrl : string;
    boardViewCount : number;
    boardCommentCount : number;
    boardFavoriteCount : number;

    boardWriteDatetime : string;
    boardWriterNickname: string;
    boardWriterProfileImageUrl : string | null;
    writerEmail : string;
}
