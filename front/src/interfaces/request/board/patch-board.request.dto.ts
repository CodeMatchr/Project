export default interface PatchBoardRequestDto {
    boardTitle: string;
    boardContents: string;
    boardImageUrl?: string | null;
  }