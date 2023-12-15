import { Ambient, Schedules } from "@/@types/types";
import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

interface StoreTypes {
  currentDate: Dayjs;
  ambients: Ambient[];
  currentAmbient: Ambient;
  setCurrentAmbient: (ambient: Ambient) => void;
  setCurrentDate: (date?: Dayjs) => void;
  setUpdateAmbients: (ambient: Ambient) => void;
  setAmbients: (newAmbients: Ambient[]) => void;
  setNewSchedule: (schedule: Schedules) => void;
}

export const useStore = create<StoreTypes>((set, get) => ({
  ambients: [],
  currentAmbient: {} as Ambient,
  currentDate: dayjs(),
  setCurrentAmbient: (ambient) => set({ currentAmbient: ambient }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setAmbients: (newAmbients) => set({ ambients: newAmbients }),
  setUpdateAmbients: (ambient) => {
    set((state) => ({
      ambients: [...state.ambients.filter((a) => a.id !== ambient.id), ambient],
    }));
  },
  setNewSchedule: (schedule) => {
    console.log(schedule);

    set((state) => ({
      currentAmbient: {
        ...state.currentAmbient,
        schedules: [...state.currentAmbient.schedules, schedule],
      },
    }));
  },
}));
