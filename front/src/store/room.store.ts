import { defaultMaxListeners } from "events";
import { create } from "zustand";

interface RoomCreateStore {
    roomNumber : string;
    roomTitle : string;
    roomImage : File | null;
    roomImageUrl : string | null;
    roomCreatePassword : string;
    // roomDateTime : string;
    // roomMemberCount : number;
    // roomUserEmail : String;
    // roomManagerNickname : string;
    // roomAccessorEmail : string;
    // roomManagerProfileImageUrl : string | null;
    // roomIsMulti : boolean;

    setRoomNumber : (roomNumber: string) => void;
    setRoomTitle : (roomTitle: string) => void;
    setRoomFileImage : (roomImage : File | null) => void;
    setRoomImageUrl : (roomImageUrl : string | null) => void;
    setRoomCreatePassword : (roomPassword : string) => void;

    resetRoom : () => void;
}

const useCreateRoomStore = create<RoomCreateStore>((set) => ({
    roomNumber: '',
    roomTitle: '',
    roomImage: null,
    roomImageUrl: null,
    roomCreatePassword: '',
    setRoomNumber: (roomNumber) => set((state) => ({...state, roomNumber})),
    setRoomTitle: (roomTitle) => set((state) => ({...state, roomTitle})),
    setRoomFileImage: (roomImage) => set((state) => ({...state, roomImage})),
    setRoomImageUrl: (roomImageUrl) => set((state) => ({...state, roomImageUrl})),
    setRoomCreatePassword: (roomCreatePassword) => set((state) => ({...state, roomCreatePassword})),
    resetRoom: () => set((state) => ({...state, roomNumber: '', roomTitle: '', roomImage: null, roomPassword: ''}))
}));

export default useCreateRoomStore;