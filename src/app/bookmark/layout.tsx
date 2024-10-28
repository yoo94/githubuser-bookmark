import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="w-full bg-gray-900">{children}</div>;
}
