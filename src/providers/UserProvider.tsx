import { useState, type ReactNode } from "react";
import { type User } from "@/types";
import { UserContext, type UserContextType } from "@/contexts/UserContext";

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const value: UserContextType = {
    activeUser,
    setActiveUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
