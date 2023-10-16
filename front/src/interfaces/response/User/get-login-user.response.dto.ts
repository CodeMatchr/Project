import ResponseDto from "../response.dto";

export default interface GetLoginUserResponseDto extends ResponseDto {
    userEmail : string;
    userNickname : string;
    userProfileImageUrl : string;
    userStateMessage:string;
}