import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookmarkItem {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  addedAt: number;
  via?: string;
}

interface BookmarkStore {
  bookmarks: BookmarkItem[];
  addBookmark: (bookmark: Omit<BookmarkItem, "addedAt">) => void;
  removeBookmark: (surahNumber: number, ayahNumber: number) => void;
  isBookmarked: (surahNumber: number, ayahNumber: number) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark) => {
        const exists = get().bookmarks.some(
          (b) =>
            b.surahNumber === bookmark.surahNumber &&
            b.ayahNumber === bookmark.ayahNumber,
        );
        if (!exists) {
          set((state) => ({
            bookmarks: [
              { ...bookmark, addedAt: Date.now() },
              ...state.bookmarks,
            ],
          }));
        }
      },
      removeBookmark: (surahNumber, ayahNumber) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (b) =>
              !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber),
          ),
        }));
      },
      isBookmarked: (surahNumber, ayahNumber) => {
        return get().bookmarks.some(
          (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber,
        );
      },
    }),
    {
      name: "quran-bookmarks",
    },
  ),
);
