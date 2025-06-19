'use client';

import { useUserStore } from '@/stores/user';
import type { User } from '@/types/user';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function checkLogin(setUser: (user: User | null) => void) {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedUser = jwtDecode<User & { exp: number }>(token);
      const isExpired = decodedUser.exp * 1000 < Date.now();
      if (isExpired) {
        localStorage.removeItem('token');
        setUser(null);
        return false;
      }
      setUser(decodedUser);
      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      setUser(null);
      return false;
    }
  } else {
    setUser(null);
    return false;
  }
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    actions: { setUser },
  } = useUserStore();

  useEffect(() => {
    const isLoggedIn = checkLogin(setUser);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router, setUser]);

  return <>{children}</>;
}
