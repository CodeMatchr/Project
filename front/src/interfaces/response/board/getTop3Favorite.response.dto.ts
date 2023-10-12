import ResponseDto from "../response.dto";
import BoardListResponseDto from "./board-list.response.dto";

export default interface GetTop3FavoriteResponseDto extends ResponseDto {
    top3Favorite : BoardListResponseDto[];
}