import ResponseDto from "../response.dto";

export interface FavoriteListResponseDto {
  userEmail : string;
  userNickname : string;
  userProfileImageUrl : string;
}

export default interface GetFavoriteListResponseDto extends ResponseDto {
  favoriteList : FavoriteListResponseDto[];
}