import { create } from "zustand";

interface RoomChatStore {
     roomChat: string;
     setRoomChat: (roomChat: string) => void;
}

const useRoomChatStore = create<RoomChatStore>(set => ({
     roomChat: '',
     setRoomChat: (roomChat: string) => set(state => ({ ...state, roomChat }))
}));

export default useRoomChatStore;