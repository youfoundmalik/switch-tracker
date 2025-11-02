import { createContext, type Dispatch, type SetStateAction } from "react";

export interface AuthContextType {
  isLoading: boolean;
  user: string | null;
  login: (username: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  updateActivity: () => Promise<void>;
  loginError: string | null;
  isRedirecting: boolean;
  setLoginError: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
