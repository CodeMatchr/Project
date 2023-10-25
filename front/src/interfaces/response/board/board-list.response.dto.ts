export default interface BoardListResponseDto {
    boardNumber : number;
    boardTitle : string;
    boardContents : string;
    boardImageUrl : string;
    boardViewCount : number;
    boardCommentCount : number;
    boardFavoriteCount : number;

    boardWriteDatetime : string;
    boardUserNickname: string;
    boardUserProfileImageUrl : string | null;
}
