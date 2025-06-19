'use client';
import { useUserStore } from '@/stores/user';
import Image from 'next/image';
import Link from 'next/link';
import MainLogo from '../../../public/main-logo.png';

export default function Header() {
  const {
    state: { user },
  } = useUserStore();

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-black/20 border-b border-purple-500/20">
      <Link
        href="/"
        className="flex items-center justify-center"
      >
        <div className="flex items-center space-x-2">
          <Image
            src={MainLogo}
            alt="Round Strike Logo"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-2xl font-bold text-white">Round Strike</span>
        </div>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {!user && (
          <Link
            href="/register"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Create account
          </Link>
        )}
        {user ? (
          <Link
            href="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Logout
          </Link>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
