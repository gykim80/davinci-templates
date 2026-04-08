"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { IUser } from "@/lib/auth";
import { parseToken, mockLogin, mockRegister } from "@/lib/auth";

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 초기 세션 복원
  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (stored) {
      const parsed = parseToken(stored);
      if (parsed) {
        setUser(parsed);
        setToken(stored);
      } else {
        localStorage.removeItem("auth_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    // 네트워크 지연 시뮬레이션
    await new Promise((r) => setTimeout(r, 500));
    const result = mockLogin(email, password);
    if (!result) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return false;
    }
    localStorage.setItem("auth_token", result.token);
    setUser(result.user);
    setToken(result.token);
    return true;
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setError(null);
      await new Promise((r) => setTimeout(r, 500));
      const result = mockRegister(email, password, name);
      if (!result) {
        setError("이미 등록된 이메일입니다.");
        return false;
      }
      localStorage.setItem("auth_token", result.token);
      setUser(result.user);
      setToken(result.token);
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
