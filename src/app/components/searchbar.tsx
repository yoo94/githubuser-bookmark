import { RefObject } from 'react';

type SearchbarProps = {
  handleClick: () => void;
  userRef: RefObject<HTMLInputElement>;
};

export default function Searchbar({
  handleClick,
  userRef,
}: SearchbarProps) {
  return (
    <div className="align-items mx-auto mt-4 flex max-w-sm justify-between space-x-2 rounded-lg p-2 pb-2 transition duration-300 bg-gray-700 md:max-w-2xl">
      <input
        name="search"
        ref={userRef}
        placeholder="Search GitHub username..."
        className="text-md mt-1 w-[400px] rounded-md  px-2 py-2 font-mono leading-6 transition duration-300 focus:outline-none bg-gray-900 text-white placeholder-gray-50"
      />
      <button
        onClick={handleClick}
        className="text-md mx-auto mt-1 h-10 rounded-md px-4 font-mono font-medium duration-300 hover:bg-gray-500 hover:text-blue-100 bg-gray-900 text-white"
      >
        Search
      </button>
    </div>
  );
}
