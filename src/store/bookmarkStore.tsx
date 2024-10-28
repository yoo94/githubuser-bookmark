import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Bookmark {
  id: number;
  login: string;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  addBookmark: (user: Bookmark) => void;
  removeBookmark: (id: number) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (user: Bookmark) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, user],
        })),
      removeBookmark: (id: number) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
        })),
    }),
    {
      name: 'bookmark-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
