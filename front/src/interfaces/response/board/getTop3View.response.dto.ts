import ResponseDto from "../../../interfaces/response/response.dto";
import BoardListResponseDto from "./board-list.response.dto";

export default interface GetTop3ViewResponseDto extends ResponseDto {
    top3View : BoardListResponseDto[];
}