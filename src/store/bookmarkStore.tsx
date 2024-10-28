import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Bookmark {
  id: number;
  login: string;
}

interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface BookmarkPersistStore {
  bookmarks: Bookmark[];
  addBookmark: (user: Bookmark) => void;
  removeBookmark: (id: number) => void;
}

interface BookmarkStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredUsers: (users: User[]) => User[]; 
}

export const useBookmarkPersistStore = create<BookmarkPersistStore>()(
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

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  filteredUsers: (users: User[]) => {
    const bookmarks = useBookmarkPersistStore.getState().bookmarks; 
    const { searchTerm } = get();
    return users.filter((user) => 
      bookmarks.some((bookmark) => bookmark.id === user.id) &&
      user.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
}));
