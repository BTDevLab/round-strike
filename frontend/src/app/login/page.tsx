'use client';

import { LoginForm } from '@/components/forms/login-form';
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
    <div className="w-full bg-muted flex flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <LoginForm />
    </div>
  );
}
