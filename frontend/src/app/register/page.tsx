import RegisterForm from '@/components/forms/register-form';
import { PublicRoute } from '@/components/layout/PublicRoute';

export default function RegisterPage() {
  return (
    <PublicRoute>
      <RegisterForm />
    </PublicRoute>
  );
}
