import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

interface schedules {
  id: number;
  title: string;
  equipment?: string;
  description?: string;
  dateEvent: Date;
  dateMinutesStart: Date;
  dateMinutesEnd: Date;
}
interface ambient {
  id: string;
  title: string;
  schedules?: schedules[];
}

interface StoreTypes {
  openModalCalendar: boolean;
  modalAmbientOpen: boolean;
  currentDate: Dayjs;
  ambients: ambient[];
  currentAmbient: ambient | null;
  setCurrentAmbient: (ambient: ambient) => void;
  setOpenModal: () => void;
  setCloseModal: () => void;
  setCurrentDate: (date?: Dayjs) => void;
  setOpenModalAmbient: () => void;
  setCloseModalAmbient: () => void;
  setUpdateAmbients: (ambient: ambient) => void;
  setAmbients: (newAmbients: ambient[]) => void;
}

export const useStore = create<StoreTypes>((set) => ({
  ambients: [],
  currentAmbient: null,
  openModalCalendar: false,
  modalAmbientOpen: false,
  currentDate: dayjs(),
  setCurrentAmbient: (ambient) => set({ currentAmbient: ambient }),
  setOpenModalAmbient: () => set({ modalAmbientOpen: true }),
  setCloseModalAmbient: () => set({ modalAmbientOpen: false }),
  setOpenModal: () => set({ openModalCalendar: true }),
  setCloseModal: () => set({ openModalCalendar: false }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setAmbients: (newAmbients) => set({ ambients: newAmbients }),
  setUpdateAmbients: (ambient) =>
    set((state) => ({ ambients: [...state.ambients, ambient] })),
}));
