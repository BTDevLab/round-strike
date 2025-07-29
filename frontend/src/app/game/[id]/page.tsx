import CharacterOverview from '@/components/character-overview-page';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

export default function PreBattle() {
  return (
    <ProtectedRoute>
      <CharacterOverview />
    </ProtectedRoute>
  );
}
