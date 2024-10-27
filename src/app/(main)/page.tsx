"use client";
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/app/api/user';
import { useUserStore } from '@/store/userStore';
import SearchBar from '@/app/components/searchbar';
import { useEffect, useRef } from 'react';
import Loading from '@/app/components/Loading';
import UserItem from '../components/UserItem';
import { User } from '@/types/user'; // User 타입 import

export default function Home() {
  const { addUsers, setSearchTerm, filteredUsers } = useUserStore(); // Zustand store에서 필요한 상태와 메서드 가져오기
  const userRef = useRef<HTMLInputElement>(null);

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

  const handleScroll = () => {
    const isBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 1;

    if (isBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // 스크롤이 맨 아래로 내려가면 다음 페이지 데이터 요청
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
      <SearchBar userRef={userRef} onChange={setSearchTerm} />
      <div className="mt-16 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* 여백 추가 */}
        {filteredUsers().map((user: User) => (
          <UserItem key={user.id} data={user} />
        ))}
      </div>
      {isFetchingNextPage && <Loading />}
    </div>
  );

}
