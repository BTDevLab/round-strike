'use client';

import { useUserStore } from '@/stores/user';
import type { User } from '@/types/user';
import { jwtDecode } from 'jwt-decode';
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
        return;
      }
      setUser(decodedUser);
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      setUser(null);
    }
  } else {
    setUser(null);
  }
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const {
    actions: { setUser },
  } = useUserStore();

  useEffect(() => {
    checkLogin(setUser);
  }, [setUser]);

  return <>{children}</>;
}
