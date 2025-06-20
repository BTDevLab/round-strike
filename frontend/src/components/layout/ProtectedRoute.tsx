'use client';

import { useUserStore } from '@/stores/user';
import type { User } from '@/types/user';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Function to check if the user is logged in by verifying the JWT token
function checkLogin(setUser: (user: User | null) => void) {
  // Retrieve the token from local storage
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // If the token is present, decode it to get user information
      const decodedUser = jwtDecode<User & { exp: number }>(token);
      const isExpired = decodedUser.exp * 1000 < Date.now();
      // Check if the token is expired
      // If expired, remove the token and set user to null
      if (isExpired) {
        localStorage.removeItem('token');
        setUser(null);
        return false;
      }
      // If valid, set the user in the store
      // and return true to indicate the user is logged in
      setUser(decodedUser);
      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      setUser(null);
      return false;
    }
  } else {
    // If no token is found, set user to null and return false
    setUser(null);
    return false;
  }
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    actions: { setUser },
  } = useUserStore();

  // Check if the user is logged in when the component mounts
  // If not logged in, redirect to the login page
  useEffect(() => {
    const isLoggedIn = checkLogin(setUser);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router, setUser]);

  return <>{children}</>;
}
