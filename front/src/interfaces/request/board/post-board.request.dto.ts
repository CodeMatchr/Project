export default interface PostBoardRequestDto {
  boardTitle : string;
  boardContents : string;
  boardImageUrl? : string | null;
}