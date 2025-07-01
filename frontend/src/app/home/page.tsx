import HomePage from '@/components/home-page';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  );
}
