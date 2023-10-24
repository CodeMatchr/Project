import { create } from "zustand";

interface RoomStore {
    roomNumber : number;
    roomTitle : string;
    roomPassword : string;
    roomImage : File | null;
    roomImageUrl : string | null;
    // roomDateTime : string;
    // roomMemberCount : number;
    // roomUserEmail : String;
    // roomManagerNickname : string;
    // roomAccessorEmail : string;
    // roomManagerProfileImageUrl : string | null;
    // roomIsMulti : boolean;

    setRoomNumber : (roomNumber: number) => void;
    setRoomTitle : (roomTitle: string) => void;
    setRoomPassword : (roomPassword : string) => void;
    setRoomImage : (roomImage : File | null) => void;
    setRoomImageUrl : (roomImageUrl : string | null) => void;
    resetRoom : () => void;
}

const useRoomStore = create<RoomStore>((set) => ({
    roomNumber: 0,
    roomTitle: '',
    roomImage: null,
    roomImageUrl: null,
    roomPassword: '',
    setRoomNumber: (roomNumber) => set((state) => ({...state, roomNumber})),
    setRoomTitle: (roomTitle) => set((state) => ({...state, roomTitle})),
    setRoomImage: (roomImage) => set((state) => ({...state, roomImage})),
    setRoomImageUrl: (roomImageUrl) => set((state) => ({...state, roomImageUrl})),
    setRoomPassword: (roomCreatePassword) => set((state) => ({...state, roomCreatePassword})),
    resetRoom: () => set((state) => ({...state, roomNumber: 0, roomTitle: '', roomImage: null, roomPassword: ''}))
}));

export default useRoomStore;