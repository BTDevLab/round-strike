import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="w-full bg-muted flex flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
        Dashboard Page
      </div>
    </ProtectedRoute>
  );
}
