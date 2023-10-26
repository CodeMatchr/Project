import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

interface UserChat {
     id: string;
     nickname: string;
     setNickname: (nickname: string) => void
}

const useUserChatStore = create<UserChat>(set => ({
     id: uuid(),
     nickname: '',
     setNickname: (nickname: string) => set(state => ({ ...state, nickname })),
}));

export default useUserChatStore;