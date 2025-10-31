import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  saveCurrentUser,
  loadCurrentUser,
  clearCurrentUser,
} from '@/utils/localStorage';
import { setupActivityTracking } from '@/utils/activityTracker';

const INACTIVITY_TIMEOUT_MS = 300000;

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const logoutRef = useRef<() => void>();

  const logout = useCallback(() => {
    clearCurrentUser();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  logoutRef.current = logout;

  useEffect(() => {
    const session = loadCurrentUser();
    if (session?.username) {
      setUser(session.username);
    }
  }, []);

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

  return {
    user,
    login,
    logout,
    isAuthenticated: user !== null,
    updateActivity,
  };
}

