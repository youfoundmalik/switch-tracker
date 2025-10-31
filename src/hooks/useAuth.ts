export function useAuth() {
  return {
    user: null,
    login: (username: string) => {},
    logout: () => {},
    isAuthenticated: false,
  };
}

