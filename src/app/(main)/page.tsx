"use client";

import Head from 'next/head';
import SearchBar from '@/app/components/searchbar';
import { useState, useRef, useEffect } from 'react';
import Loading from '@/app/components/Loading';
import UserItem from '../components/UserItem';

export default function Home() {
  const API_URL = "https://api.github.com/users";
  const userRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState<string>('');
  const [data, setData] = useState<any[]>([]); // 빈 배열로 초기화
  const [isLoading, setLoading] = useState<boolean>(false);

  function handleClick() {
    setUserName(userRef.current?.value || '');
  }

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL+"?per_page=20");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-900">
      <SearchBar handleClick={handleClick} userRef={userRef} />
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((user) => (
          <UserItem key={user.id} data={user} />
        ))}
      </div>
    </div>
  );
}
