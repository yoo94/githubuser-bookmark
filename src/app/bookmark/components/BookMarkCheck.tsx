import { useBookmarkStore } from '@/store/bookmarkStore';

type StarCheckboxProps = {
  userId: number;
  login: string;
  isChecked: boolean;
};

export default function BookMarkCheck({ userId, login, isChecked }: StarCheckboxProps) {
  const { addBookmark, removeBookmark } = useBookmarkStore();

  const handleChange = () => {
    if (isChecked) {
      removeBookmark(userId);
    } else {
      addBookmark({ id: userId, login });
    }
  };

  return (
    <div>
      <svg
        onClick={handleChange}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-8 w-8 ${isChecked ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-200 cursor-pointer`} // 크기 조정
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 17.25l-6.16 3.247a1 1 0 01-1.45-1.054l1.182-7.056L.36 9.437a1 1 0 01.555-1.732l7.093-1.036L12 2l3.992 5.669 7.094 1.036a1 1 0 01.555 1.732l-5.42 5.471 1.182 7.056a1 1 0 01-1.45 1.054L12 17.25z"
        />
      </svg>
    </div>
  );
}
