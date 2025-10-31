import { type ReactNode } from 'react';
import { LogoutButton } from '@/components/auth/LogoutButton';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <header>
        <LogoutButton />
      </header>
      <main>{children}</main>
    </div>
  );
}

