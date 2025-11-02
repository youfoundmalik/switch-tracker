import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { saveCurrentUser, loadCurrentUser, clearCurrentUser } from "@/utils/localStorage";
import { setupActivityTracking } from "@/utils/activityTracker";
import { MOCK_USERS } from "@/data/users";
import { useUser } from "@/hooks/context/useUser";
import { useToast } from "@/hooks/context/useToast";
import { AuthContext, type AuthContextType } from "@/contexts/AuthContext";
import { AppConfig } from "@/utils/config";

function getInitialUser(): string | null {
  const session = loadCurrentUser();
  return session?.username ?? null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(getInitialUser);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const logoutRef = useRef<() => Promise<void>>(null!);
  const { setActiveUser } = useUser();
  const { showToast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearCurrentUser();
    setUser(null);
    setActiveUser(null);
    setIsLoading(false);
    navigate("/login");
  }, [navigate, setActiveUser]);

  logoutRef.current = logout;

  useEffect(() => {
    if (!user) return;

    const cleanup = setupActivityTracking(() => {
      if (logoutRef.current) {
        logoutRef.current();
      }
    }, AppConfig.INACTIVITY_TIMEOUT_MS);

    return cleanup;
  }, [user]);

  // Load active user when user changes
  useEffect(() => {
    if (user) {
      const foundUser = MOCK_USERS.find((u) => u.username === user);
      if (foundUser) {
        setActiveUser(foundUser);
      }
    } else {
      setActiveUser(null);
    }
  }, [user, setActiveUser]);

  const login = useCallback(
    async (username: string): Promise<boolean> => {
      setIsLoading(true);
      setLoginError(null);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!username.trim()) {
        setLoginError("Username is required");
        showToast("Username is required", "error", "login");
        setIsLoading(false);
        return false;
      }

      const trimmedUsername = username.trim();
      const foundUser = MOCK_USERS.find((u) => u.username === trimmedUsername);

      if (!foundUser) {
        setLoginError("Invalid username. Please try again.");
        showToast("Invalid username. Please try again.", "error", "login");
        setIsLoading(false);
        return false;
      }
      setLoginError(null);
      setIsLoading(false);
      setIsRedirecting(true);
      showToast("Login successful!", "success", "login");
      setTimeout(() => {
        setIsRedirecting(false);
        saveCurrentUser(trimmedUsername);
        setUser(trimmedUsername);
        setActiveUser(foundUser);
        navigate("/dashboard");
      }, 2000);
      return true;
    },
    [navigate, setActiveUser, showToast]
  );

  const updateActivity = useCallback((): void => {
    if (user) {
      saveCurrentUser(user);
    }
  }, [user]);

  const value: AuthContextType = {
    isLoading,
    user,
    login,
    logout,
    isAuthenticated: user !== null,
    updateActivity,
    loginError,
    setLoginError,
    isRedirecting,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
