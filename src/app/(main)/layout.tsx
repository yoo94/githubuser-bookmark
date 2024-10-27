"use client";
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='bg-gray-900 w-full'>
        {children}
      </div>
    </QueryClientProvider>
  );
}
