import { create } from "zustand";

interface RoomStore {
    roomNumber : string;
    roomTitle : string;
    roomImage : File | null;
    roomImageUrl : string | null;
    roomPassword : string;
    // roomDateTime : string;
    // roomMemberCount : number;
    // roomUserEmail : String;
    // roomManagerNickname : string;
    // roomAccessorEmail : string;
    // roomManagerProfileImageUrl : string | null;
    // roomIsMulti : boolean;

    setRoomNumber : (roomNumber: string) => void;
    setRoomTitle : (roomTitle: string) => void;
    setRoomImage : (roomImage : File | null) => void;
    setRoomImageUrl : (roomImageUrl : string | null) => void;
    setRoomPassword : (roomPassword : string) => void;

    resetRoom : () => void;
}

const useRoomStore = create<RoomStore>((set) => ({
    roomNumber: '',
    roomTitle: '',
    roomImage: null,
    roomImageUrl: null,
    roomPassword: '',
    setRoomNumber: (roomNumber) => set((state) => ({...state, roomNumber})),
    setRoomTitle: (roomTitle) => set((state) => ({...state, roomTitle})),
    setRoomImage: (roomImage) => set((state) => ({...state, roomImage})),
    setRoomImageUrl: (roomImageUrl) => set((state) => ({...state, roomImageUrl})),
    setRoomPassword: (roomCreatePassword) => set((state) => ({...state, roomCreatePassword})),
    resetRoom: () => set((state) => ({...state, roomNumber: '', roomTitle: '', roomImage: null, roomPassword: ''}))
}));

export default useRoomStore;