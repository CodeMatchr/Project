import { create } from "zustand";

interface BoardWriteStore {
    boardNumber : string;
    boardTitle : string;
    boardContents :string;
    boardImage : File | null;
    boardImageUrl :string | null;

    setBoardNumber: (boardNumber : string) => void;
    setBoardTitle: (boardTitle: string) => void;
    setBoardContents: (boardContents: string) => void;
    setBoardImage: (boardImage: File | null) => void;
    setBoardImageUrl: (boardImageUrl: string | null) => void;

    resetBoard: () => void;
}

const boardStore = create<BoardWriteStore>((set) =>({
    boardNumber: '' ,
    boardTitle : '' ,
    boardContents : '' ,
    boardImage  : null ,
    boardImageUrl : null ,

    setBoardNumber: (boardNumber) => set((state) => ({ ...state, boardNumber })),
    setBoardTitle: (boardTitle) => set((state) => ({ ...state, boardTitle })),
    setBoardContents: (boardContents) => set((state) => ({ ...state, boardContents })),
    setBoardImage: (boardImage) => set((state) => ({ ...state, boardImage })),
    setBoardImageUrl: (boardImageUrl) => set((state) => ({ ...state, boardImageUrl })),
  
    resetBoard: () => set((state) => ({ ...state, boardNumber: '', boardTitle: '', boardContents: '', boardImage: null })),
}));

export default boardStore;