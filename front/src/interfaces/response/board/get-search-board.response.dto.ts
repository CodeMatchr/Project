import ResponseDto from "../response.dto";
import BoardListResponseDto from "./board-list.response.dto";

export default interface GetSearchBoardResponseDto extends ResponseDto {
  boardList : BoardListResponseDto[];
}