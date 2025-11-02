import { createContext } from "react";

export type ToastType = "success" | "error";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  scope?: string; // Scope identifier for isolating toasts
}

export interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType, scope?: string) => void;
  removeToast: (id: string) => void;
  clearToastsByScope: (scope: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
