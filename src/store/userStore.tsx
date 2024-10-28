import { create } from 'zustand';

interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface UserStore {
  users: User[];
  searchTerm: string;
  addUsers: (newUsers: User[]) => void;
  setSearchTerm: (term: string) => void;
  filteredUsers: () => User[];
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  searchTerm: '',
  addUsers: (newUsers) =>
    set((state) => {
      const existingUsers = state.users.map((user) => user.id);
      const uniqueUsers = newUsers.filter((user) => !existingUsers.includes(user.id));
      return {
        users: [...state.users, ...uniqueUsers],
      };
    }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  filteredUsers: () => {
    const { users, searchTerm } = get();
    return users.filter((user) => user.login.toLowerCase().includes(searchTerm.toLowerCase()));
  },
}));
