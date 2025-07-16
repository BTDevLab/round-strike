import CharacterCreationPage from '@/components/character-creation'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'

export default function CharacterCreation() {
  return (
    <ProtectedRoute>
        <CharacterCreationPage />
    </ProtectedRoute>
  )
}