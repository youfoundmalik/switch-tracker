import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  saveCurrentUser,
  loadCurrentUser,
  clearCurrentUser,
} from '@/utils/localStorage';
import { setupActivityTracking } from '@/utils/activityTracker';

const INACTIVITY_TIMEOUT_MS = 300000;

function getInitialUser(): string | null {
  const session = loadCurrentUser();
  return session?.username ?? null;
}

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateActivity: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(getInitialUser);
  const navigate = useNavigate();
  const logoutRef = useRef<() => void>();

  const logout = useCallback(() => {
    clearCurrentUser();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  logoutRef.current = logout;

  useEffect(() => {
    if (!user) return;

    const cleanup = setupActivityTracking(() => {
      if (logoutRef.current) {
        logoutRef.current();
      }
    }, INACTIVITY_TIMEOUT_MS);

    return cleanup;
  }, [user]);

  const login = useCallback((username: string): void => {
    if (!username.trim()) return;

    saveCurrentUser(username);
    setUser(username);
    navigate('/dashboard');
  }, [navigate]);

  const updateActivity = useCallback((): void => {
    if (user) {
      saveCurrentUser(user);
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: user !== null,
    updateActivity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

