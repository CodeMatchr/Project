import ResponseDto from "../response.dto";
import BoardListResponseDto from "./board-list.response.dto";

export default interface GetTop3CommentResponseDto extends ResponseDto {
    top3Comment : BoardListResponseDto[];
}