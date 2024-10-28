'use client';

import { RefObject, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type SearchBarProps = {
  userRef: RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
};

export default function SearchBar({ userRef, onChange }: SearchBarProps) {
  const router = useRouter();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleOrderClick = () => {
    const currentPath = window.location.pathname;
    router.push(currentPath === '/bookmark' ? '/' : '/bookmark');
  };

  const buttonText = window.location.pathname === '/bookmark' ? 'HOME PAGE' : 'BOOKMARK PAGE';
  
  useEffect(()=>{
    onChange('');
  },[])
  return (
    <div className="fixed inset-x-0 top-0 mt-10 flex items-center justify-between bg-gray-700 p-2">
      <div className="flex-1 flex justify-center">
        <input
          ref={userRef}
          placeholder="Search GitHub username..."
          className="w-full max-w-sm rounded-md bg-gray-900 p-2 text-white placeholder:text-gray-50"
          onChange={handleInputChange}
        />
        <button onClick={handleOrderClick}>
          <span className="ml-4 flex items-center text-yellow-500 mr-8">{buttonText}</span>
        </button>
      </div>
    </div>
  );
}
