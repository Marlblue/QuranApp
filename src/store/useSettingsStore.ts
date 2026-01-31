import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  arabicFontSize: number;
  translationFontSize: number;
  showLatin: boolean;
  showTranslation: boolean;
  reciterId: string;

  // Actions
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
  toggleLatin: () => void;
  toggleTranslation: () => void;
  setReciterId: (id: string) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      arabicFontSize: 32, // Default size
      translationFontSize: 16,
      showLatin: true,
      showTranslation: true,
      reciterId: "05", // Default to Misyari Rasyid

      setArabicFontSize: (size) => set({ arabicFontSize: size }),
      setTranslationFontSize: (size) => set({ translationFontSize: size }),
      toggleLatin: () => set((state) => ({ showLatin: !state.showLatin })),
      toggleTranslation: () =>
        set((state) => ({ showTranslation: !state.showTranslation })),
      setReciterId: (id) => set({ reciterId: id }),
      resetSettings: () =>
        set({
          arabicFontSize: 32,
          translationFontSize: 16,
          showLatin: true,
          showTranslation: true,
          reciterId: "05",
        }),
    }),
    {
      name: "quran-settings",
    },
  ),
);
