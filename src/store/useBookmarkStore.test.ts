import { describe, it, expect, beforeEach } from 'vitest';
import { useBookmarkStore } from './useBookmarkStore';

describe('useBookmarkStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useBookmarkStore.setState({ bookmarks: [] });
    localStorage.clear();
  });

  it('should start with empty bookmarks', () => {
    const { bookmarks } = useBookmarkStore.getState();
    expect(bookmarks).toEqual([]);
  });

  it('should add a bookmark', () => {
    const bookmark = {
      surahNumber: 1,
      surahName: 'Al-Fatihah',
      ayahNumber: 1,
    };

    useBookmarkStore.getState().addBookmark(bookmark);

    const { bookmarks } = useBookmarkStore.getState();
    expect(bookmarks).toHaveLength(1);
    expect(bookmarks[0]).toMatchObject(bookmark);
    expect(bookmarks[0].addedAt).toBeDefined();
  });

  it('should not add duplicate bookmarks', () => {
    const bookmark = {
      surahNumber: 1,
      surahName: 'Al-Fatihah',
      ayahNumber: 1,
    };

    useBookmarkStore.getState().addBookmark(bookmark);
    useBookmarkStore.getState().addBookmark(bookmark);

    const { bookmarks } = useBookmarkStore.getState();
    expect(bookmarks).toHaveLength(1);
  });

  it('should remove a bookmark', () => {
    const bookmark = {
      surahNumber: 1,
      surahName: 'Al-Fatihah',
      ayahNumber: 1,
    };

    useBookmarkStore.getState().addBookmark(bookmark);
    useBookmarkStore.getState().removeBookmark(1, 1);

    const { bookmarks } = useBookmarkStore.getState();
    expect(bookmarks).toHaveLength(0);
  });

  it('should check if bookmarked correctly', () => {
    const bookmark = {
      surahNumber: 1,
      surahName: 'Al-Fatihah',
      ayahNumber: 1,
    };

    useBookmarkStore.getState().addBookmark(bookmark);

    expect(useBookmarkStore.getState().isBookmarked(1, 1)).toBe(true);
    expect(useBookmarkStore.getState().isBookmarked(1, 2)).toBe(false);
  });
});
