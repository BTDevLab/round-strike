'use client';

import { LoginForm } from '@/components/forms/login-form';
import { PublicRoute } from '@/components/layout/PublicRoute';
import { useUserStore } from '@/stores/user';
import { useEffect } from 'react';

export default function LoginPage() {
  const {
    actions: { setUser, logout },
  } = useUserStore();

  useEffect(() => {
    setUser(null);
    logout();
  }, [setUser, logout]);

  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  );
}
