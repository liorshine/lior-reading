// src/context/AuthContext.tsx
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  role: string | null;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const res = await fetch("/api/users/me", { cache: "no-store" });
      const data = await res.json();
      if (data.loggedIn) {
        setIsLoggedIn(true);
        setUsername(data.user?.username || null);
        setRole(data.user?.role || null);
      } else {
        setIsLoggedIn(false);
        setUsername(null);
        setRole(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUsername(null);
      setRole(null);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, role, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
