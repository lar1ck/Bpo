import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { login, logout } from '../api/auth.api';

interface AuthContextType {
  user: string | null;
  loginUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage, if user info is saved
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem('user') || null;
  });

  const loginUser = async (username: string, password: string) => {
    await login({ username, password });
    setUser(username);
    localStorage.setItem('user', username); // persist user on login
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem('user'); // clear stored user on logout
  };

  // Optional: you can also validate token/session here on mount if you implement tokens

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
