import { create } from "zustand";

interface StoreTypes {
  openModal: boolean;
  setOpenModal: () => void;
  setCloseModal: () => void;
  currentDate: string;
  setCurrentDate: (date?: string) => void;
}

export const useStore = create<StoreTypes>((set, get) => ({
  openModal: false,
  currentDate: "",
  setOpenModal: () => set({ openModal: true }),
  setCloseModal: () => set({ openModal: false }),
  setCurrentDate: (date) => set({ currentDate: date }),
}));
