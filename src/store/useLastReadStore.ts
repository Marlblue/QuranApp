import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LastReadState {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
}

interface LastReadStore {
  lastRead: LastReadState | null;
  setLastRead: (data: LastReadState) => void;
}

export const useLastReadStore = create<LastReadStore>()(
  persist(
    (set) => ({
      lastRead: null,
      setLastRead: (data) => set({ lastRead: data }),
    }),
    {
      name: 'quran-last-read',
    }
  )
);
