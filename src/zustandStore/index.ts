import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

interface StoreTypes {
  openModalCalendar: boolean;
  modalAmbientOpen: boolean;
  currentDate: Dayjs;
  ambients: string[];
  setOpenModal: () => void;
  setCloseModal: () => void;
  setCurrentDate: (date?: Dayjs) => void;
  setOpenModalAmbient: () => void;
  setCloseModalAmbient: () => void;
  setAmbients: (ambient: string) => void;
}

export const useStore = create<StoreTypes>((set) => ({
  ambients: [],
  openModalCalendar: false,
  modalAmbientOpen: false,
  currentDate: dayjs(),
  setOpenModalAmbient: () => set({ modalAmbientOpen: true }),
  setCloseModalAmbient: () => set({ modalAmbientOpen: false }),
  setOpenModal: () => set({ openModalCalendar: true }),
  setCloseModal: () => set({ openModalCalendar: false }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setAmbients: (ambient) =>
    set((state) => ({ ambients: [...state.ambients, ambient] })),
}));
