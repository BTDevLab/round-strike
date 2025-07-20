'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-screen items-center justify-center bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
        <Loader2 className="h-16 w-16 animate-spin text-purple-400" />
      </div>
    );
  }

  return <>{children}</>;
}
