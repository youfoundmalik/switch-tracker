import { createContext } from "react";
import { type User } from "@/types";

export interface UserContextType {
  activeUser: User | null;
  setActiveUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
