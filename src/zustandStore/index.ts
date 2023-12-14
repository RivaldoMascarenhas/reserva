import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

export interface Schedules {
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
  schedules: Schedules[];
}

interface StoreTypes {
  currentDate: Dayjs;
  ambients: ambient[];
  currentAmbient: ambient;
  setCurrentAmbient: (ambient: ambient) => void;
  setCurrentDate: (date?: Dayjs) => void;
  setUpdateAmbients: (ambient: ambient) => void;
  setAmbients: (newAmbients: ambient[]) => void;
  setNewSchedule: (schedule: Schedules) => void;
}

export const useStore = create<StoreTypes>((set, get) => ({
  ambients: [],
  currentAmbient: {} as ambient,
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
