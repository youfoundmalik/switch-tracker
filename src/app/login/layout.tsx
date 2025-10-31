import { type ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return <div>{children}</div>;
}

