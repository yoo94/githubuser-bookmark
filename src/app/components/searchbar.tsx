import { RefObject } from 'react';

type SearchBarProps = {
  userRef: RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
};

export default function SearchBar({ userRef, onChange }: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 mt-10 bg-gray-700 p-2">
      <div className="mx-auto flex max-w-sm space-x-2 rounded-lg">
        <input
          ref={userRef}
          placeholder="Search GitHub username..."
          className="w-full rounded-md bg-gray-900 p-2 text-white placeholder:text-gray-50"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
