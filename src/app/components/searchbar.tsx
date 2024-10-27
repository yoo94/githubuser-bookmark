import { RefObject } from 'react';

type SearchBarProps = {
  userRef: RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
};

export default function SearchBar({
  userRef,
  onChange,
}: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-700 p-2 mt-10">
      <div className="flex max-w-sm mx-auto space-x-2 rounded-lg">
        <input
          ref={userRef}
          placeholder="Search GitHub username..."
          className="w-full p-2 rounded-md bg-gray-900 text-white placeholder-gray-50"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
