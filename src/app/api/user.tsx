import { User } from '@/types/user';
import { fetchData } from './api';

export const fetchUsersList = async (since?: unknown) => {
  let endpoint = '/users?per_page=20';
  if (since) {
    endpoint += `&since=${since}`;
  }

  return await fetchData(endpoint);
};

export const fetchUser = async (username: string): Promise<User> => {
  const endpoint = `/users/${username}`;
  return await fetchData(endpoint);
};
