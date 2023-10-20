import ResponseDto from "../response.dto";
import BoardListResponseDto from "./board-list.response.dto";

export default interface GetTop3ResponseDto extends ResponseDto {
  top3 : BoardListResponseDto[];
}