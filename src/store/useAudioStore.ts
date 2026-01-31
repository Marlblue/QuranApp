import { create } from "zustand";
import type { Ayah } from "@/types/quran.types";

interface AudioState {
  isPlaying: boolean;
  currentSurah: number | null;
  currentAyah: number | null;
  audioUrl: string | null;
  playlist: Ayah[];

  setAudio: (
    surah: number,
    ayah: number,
    url: string,
    playlist?: Ayah[],
  ) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (time: number) => void;
  setDuration: (duration: number) => void;
  currentTime: number;
  duration: number;
  setCurrentTime: (time: number) => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
  cycleSpeed: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isPlaying: false,
  currentSurah: null,
  currentAyah: null,
  audioUrl: null,
  playlist: [],
  currentTime: 0,
  duration: 0,
  playbackRate: 1,
  error: null,

  setAudio: (surah, ayah, url, playlist = []) =>
    set({
      currentSurah: surah,
      currentAyah: ayah,
      audioUrl: url,
      playlist: playlist,
      isPlaying: true,
      currentTime: 0,
      error: null,
    }),

  play: () => set({ isPlaying: true, error: null }),
  pause: () => set({ isPlaying: false }),
  stop: () =>
    set({
      isPlaying: false,
      currentSurah: null,
      currentAyah: null,
      audioUrl: null,
      playlist: [],
      currentTime: 0,
      duration: 0,
      error: null,
    }),

  seek: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setPlaybackRate: (rate) => set({ playbackRate: rate }),
  cycleSpeed: () => {
    const rates = [1, 1.25, 1.5, 2, 0.75];
    const currentRate = get().playbackRate;
    const nextIndex = (rates.indexOf(currentRate) + 1) % rates.length;
    set({ playbackRate: rates[nextIndex] });
  },
  setError: (error) => set({ error, isPlaying: false }),

  playNext: () => {
    const { playlist, currentAyah } = get();
    if (!playlist.length || !currentAyah) return;

    const currentIndex = playlist.findIndex(
      (a) => a.number_in_surah === currentAyah,
    );
    if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
      const nextAyah = playlist[currentIndex + 1];
      set({
        currentAyah: nextAyah.number_in_surah,
        audioUrl: nextAyah.audio_url,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false }); // End of playlist
    }
  },

  playPrevious: () => {
    const { playlist, currentAyah } = get();
    if (!playlist.length || !currentAyah) return;

    const currentIndex = playlist.findIndex(
      (a) => a.number_in_surah === currentAyah,
    );
    if (currentIndex > 0) {
      const prevAyah = playlist[currentIndex - 1];
      set({
        currentAyah: prevAyah.number_in_surah,
        audioUrl: prevAyah.audio_url,
        isPlaying: true,
      });
    }
  },
}));
