'use client';
import BookMarkCheck from '@/app/bookmark/components/BookMarkCheck';
import { useBookmarkPersistStore } from '@/store/bookmarkStore';
import Image from 'next/image';

type UserItemProps = {
  data: {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

export default function UserItem({ data }: UserItemProps) {
  const { bookmarks } = useBookmarkPersistStore();
  const isChecked = bookmarks.some((bookmark) => bookmark.id === data.id);

  return (
    <div className="mx-11 my-1 flex h-16 items-center rounded-md bg-gray-800 p-4 shadow-md">
      <Image
        width={48}
        height={48}
        src={data.avatar_url}
        alt={`${data.login}'s avatar`}
        className="rounded-full border-2 border-blue-400"
      />
      <div className="ml-4 flex flex-1 items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">{data.login || 'Unknown'}</h2>
          <div className="mt-1 text-xs text-gray-300">
            <p>
              <a
                className="hover:text-blue-600"
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                go to {data.login}&#39;s GitHub page
              </a>
            </p>
          </div>
        </div>
        <BookMarkCheck userId={data.id} login={data.login} isChecked={isChecked} />
      </div>
    </div>
  );
}
