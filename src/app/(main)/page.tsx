"use client";
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/app/api/user';
import { useUserStore } from '@/store/userStore';
import SearchBar from '@/app/components/searchbar';
import { useEffect, useRef, useState } from 'react';
import Loading from '@/app/components/Loading';
import UserItem from '../components/UserItem';
import { User } from '@/types/user';

export default function Home() {
  const { addUsers } = useUserStore();
  const userRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState<string>('');

  function handleClick() {
    setUserName(userRef.current?.value || '');
  }

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = null }) => fetchUsers(pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage || !Array.isArray(lastPage) || lastPage.length === 0) return undefined; 
      const lastUser = lastPage[lastPage.length - 1];
      if (!lastUser || !lastUser.id) {
        return undefined;
      }
      
      return lastUser.id;
    },
    initialPageParam: null,
  });

  useEffect(() => {
    if (data?.pages) {
      const users: User[] = data.pages.flat();
      addUsers(users);
    }
  }, [data, addUsers]);

  const handleScroll = () => {
    const isBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 1;

    if (isBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-900">
      <SearchBar handleClick={handleClick} userRef={userRef} />
      <div className="grid grid-cols-2">
        {data?.pages.map((page) => (
          page.map((user: User) => (
            <UserItem key={user.id} data={user} />
          ))
        ))}
      </div>
      {isFetchingNextPage && <Loading />}
    </div>
  );
}
