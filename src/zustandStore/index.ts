import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

export interface schedules {
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
  schedules: schedules[];
}

interface StoreTypes {
  currentDate: Dayjs;
  ambients: ambient[];
  currentAmbient: ambient;
  setCurrentAmbient: (ambient: ambient) => void;
  setCurrentDate: (date?: Dayjs) => void;
  setUpdateAmbients: (ambient: ambient) => void;
  setAmbients: (newAmbients: ambient[]) => void;
  setNewSchedule: (schedule: schedules) => void;
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
    set((state) => ({
      currentAmbient: {
        ...state.currentAmbient,
        schedules: [
          ...state.currentAmbient.schedules.filter((a) => a.id !== schedule.id),
          schedule,
        ],
      },
    }));
  },
}));
