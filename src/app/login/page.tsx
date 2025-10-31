import { LoginLayout } from './layout';
import { LoginForm } from '@/components/auth/LoginForm';

export function LoginPage() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}

