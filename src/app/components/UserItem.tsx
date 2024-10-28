import BookMarkCheck from '@/app/bookmark/components/BookMarkCheck';
import { useBookmarkStore } from '@/store/bookmarkStore';
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
  const { bookmarks } = useBookmarkStore();
  const isChecked = bookmarks.some((bookmark) => bookmark.id === data.id);

  return (
    <div className="mx-11 my-2 flex w-auto items-center rounded-md bg-gray-800 p-4 shadow-md">
      <Image
        src={data.avatar_url}
        alt={`${data.login}'s avatar`}
        className="size-12 rounded-full border-2 border-blue-400"
      />
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h2 className="text-sm font-semibold text-white">{data.login || 'Unknown'}</h2>
        </div>
        <div className="mt-1 text-xs text-gray-300">
          <p>
            <a className="hover:text-blue-600" href={data.html_url} target="_blank">
              go to {data.login}&#39;s GitHub page
            </a>
          </p>
        </div>
        <BookMarkCheck userId={data.id} login={data.login} isChecked={isChecked} />
      </div>
    </div>
  );
}
