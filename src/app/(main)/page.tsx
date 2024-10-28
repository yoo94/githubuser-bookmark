'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsersList } from '@/app/api/user';
import { useUserStore } from '@/store/userStore';
import SearchBar from '@/app/components/searchbar';
import { useEffect, useCallback } from 'react';
import Loading from '@/app/components/Loading';
import UserItem from '../components/UserItem';
import { User } from '@/types/user';

export default function Home() {
  const { addUsers, setSearchTerm, filteredUsers } = useUserStore();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = null }) => fetchUsersList(pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage || !Array.isArray(lastPage) || lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].id;
    },
    initialPageParam: null,
  });

  useEffect(() => {
    if (data?.pages) {
      const users: User[] = data.pages.flat();
      addUsers(users);
    }
  }, [data, addUsers]);

  const handleScroll = useCallback(() => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 1;

    if (isBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-900">
      <SearchBar onChange={setSearchTerm} />
      <div className="mt-20 grid grid-cols-1 bg-gray-900 p-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers().map((user: User) => (
          <UserItem key={user.id} data={user} />
        ))}
      </div>
      {isFetchingNextPage && <Loading />}
    </div>
  );
}
