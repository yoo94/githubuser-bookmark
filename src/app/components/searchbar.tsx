'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type SearchBarProps = {
  onChange: (value: string) => void;
};

export default function SearchBar({ onChange }: SearchBarProps) {
  const router = useRouter();
  const [buttonText, setButtonText] = useState('HOME PAGE');

  useEffect(() => {
    onChange('');
    const currentPath = window.location.pathname;
    setButtonText(currentPath === '/bookmark' ? 'HOME PAGE' : 'BOOKMARK PAGE');
  }, []);

  const handleOrderClick = () => {
    const currentPath = window.location.pathname;
    router.push(currentPath === '/bookmark' ? '/' : '/bookmark');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div className="fixed inset-x-0 top-0 mt-10 flex items-center justify-between bg-gray-700 p-2">
      <div className="flex flex-1 justify-center">
        <input
          placeholder="Search GitHub username..."
          className="w-full max-w-sm rounded-md bg-gray-900 p-2 text-white placeholder:text-gray-50"
          onChange={handleInputChange}
        />
        <button onClick={handleOrderClick}>
          <span className="ml-4 mr-8 flex items-center text-yellow-500">{buttonText}</span>
        </button>
      </div>
    </div>
  );
}