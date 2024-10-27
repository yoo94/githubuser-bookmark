import './globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-full min-h-screen flex-col items-center justify-between">
        <header className="fixed w-full bg-gray-800 py-4 text-center text-white">
          <Link href="/">GitHub User Bookmarker</Link>
        </header>
        <main className="flex w-full flex-1 items-center justify-center">{children}</main>
        <footer className="w-full bg-gray-200 py-2 text-center">
          <div>제작 @yoo94</div>
        </footer>
      </body>
    </html>
  );
}
