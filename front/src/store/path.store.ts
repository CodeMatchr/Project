import { create } from "zustand";

interface Path {
  path: string;
  setPath: (path: string) => void;
}

const usePathStore = create<Path>(set => ({
  path: '/',
  setPath: (path: string) => set(state => ({ ...state, path })),
}));

export default usePathStore;