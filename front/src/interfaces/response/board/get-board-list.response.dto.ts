import ResponseDto from "../response.dto";
import BoardListResponseDto from "./board-list.response.dto";

export default interface GetBoardListResponeDto extends ResponseDto {
    boardList : BoardListResponseDto[];
  }