import { type ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { UserProvider } from "./UserProvider";
import { ToastProvider } from "./ToastProvider";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Combined providers component to reduce nesting in the router
 * Order matters: ToastProvider (outermost, used everywhere) -> 
 * UserProvider -> AuthProvider (needs both UserProvider and ToastProvider)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ToastProvider>
      <UserProvider>
        <AuthProvider>{children}</AuthProvider>
      </UserProvider>
    </ToastProvider>
  );
}

