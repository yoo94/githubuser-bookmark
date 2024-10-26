import { ReactNode } from 'react';
import Searchbar from '@/app/components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-gray-900 w-full'>
      {children}
    </div>
  );
}
