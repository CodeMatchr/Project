import ResponseDto from "../response.dto";

export default interface GetUserResponseDto extends ResponseDto {
  userEmail : string;
  userNickname : string;
  userProfileImageUrl : string;
  userStateMessage: string;
}