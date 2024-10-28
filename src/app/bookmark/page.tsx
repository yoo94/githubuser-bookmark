'use client';
import { useEffect, useRef, useState } from 'react';
import UserItem from '@/app/components/UserItem';
import { useBookmarkStore } from '@/store/bookmarkStore';
import { fetchUser } from '@/app/api/user';
import { User } from '@/types/user';
import SearchBar from '@/app/components/searchbar';
import { useUserStore } from '@/store/userStore';

export default function BookmarkPage() {
  const { bookmarks } = useBookmarkStore();
  const { setSearchTerm } = useUserStore();

  const [bookmarkedUsers, setBookmarkedUsers] = useState<User[]>([]);
  const userRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchBookmarkedUsers = async () => {
      const usersData = await Promise.all(
        bookmarks.map(async (bookmark) => {
          try {
            return await fetchUser(bookmark.login);
          } catch (error) {
            console.error('Error fetching user:', error);
            return null;
          }
        }),
      );
      setBookmarkedUsers(usersData.filter((user) => user !== null) as User[]);
    };

    fetchBookmarkedUsers();
  }, [bookmarks]);

  return (
    <div className="min-h-screen bg-gray-900">
      <SearchBar userRef={userRef} onChange={setSearchTerm} />
      <div className="grid grid-cols-1 bg-gray-900 p-4 md:grid-cols-2 lg:grid-cols-3 mt-20">
        {bookmarkedUsers.map((user) => (
          <UserItem key={user.login} data={user} />
        ))}
      </div>
    </div>
  );
}
