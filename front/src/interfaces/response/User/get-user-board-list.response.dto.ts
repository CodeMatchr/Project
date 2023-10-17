import BoardListResponseDto from "../board/board-list.response.dto";
import ResponseDto from "../response.dto";

export default interface GetUserBoardListResponseDto extends ResponseDto {
  boardList : BoardListResponseDto[];
}