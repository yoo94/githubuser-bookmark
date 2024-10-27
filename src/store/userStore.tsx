import { create } from 'zustand'; // named import로 변경

interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface UserStore {
  users: User[];
  addUsers: (newUsers: User[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  addUsers: (newUsers) => set((state) => ({
    users: [...state.users, ...newUsers],
  })),
}));
