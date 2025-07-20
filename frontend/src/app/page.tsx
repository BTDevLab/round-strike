import LandingPage from '@/components/landing-page';
import { PublicRoute } from '@/components/layout/PublicRoute';

export default function Home() {
  return (
    <PublicRoute>
      <LandingPage />
    </PublicRoute>
  );
}
