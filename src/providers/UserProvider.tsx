import { useState, useCallback, type ReactNode } from "react";
import { type User } from "@/types";
import { UserContext, type UserContextType } from "@/contexts/UserContext";

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const handleSetActiveUser = useCallback((user: User | null) => {
    setActiveUser(user);
  }, []);

  const value: UserContextType = {
    activeUser,
    setActiveUser: handleSetActiveUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
