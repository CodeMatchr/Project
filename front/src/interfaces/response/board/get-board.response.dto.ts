import ResponseDto from "../response.dto";

export default interface GetBoardResponseDto extends ResponseDto {
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
    boardWriterEmail : string;
}