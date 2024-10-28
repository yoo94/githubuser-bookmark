'use client';
import { useEffect, useState } from 'react';
import UserItem from '@/app/components/UserItem';
import { useBookmarkStore } from '@/store/bookmarkStore';
import { fetchUser } from '@/app/api/user';
import { User } from '@/types/user';

export default function BookmarkPage() {
  const { bookmarks } = useBookmarkStore();
  const [bookmarkedUsers, setBookmarkedUsers] = useState<User[]>([]);

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
    <div className="grid min-h-screen grid-cols-1 gap-6 bg-gray-900 p-4 md:grid-cols-2 lg:grid-cols-3">
      {bookmarkedUsers.map((user) => (
        <UserItem key={user.login} data={user} />
      ))}
    </div>
  );
}
