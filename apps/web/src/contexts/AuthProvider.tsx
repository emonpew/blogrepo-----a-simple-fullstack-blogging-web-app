"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthService } from "../services/auth.service";
import { useRouter } from "next/navigation";

interface AuthContextType {
  username: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        try {
          const res = await AuthService.verifyToken(token);
          setUsername(res.username);
        } catch (error) {
          localStorage.removeItem("jwtToken");
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { username: loggedInUsername } = await AuthService.login({
        username,
        password,
      });
      setUsername(loggedInUsername);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string) => {
    setLoading(true);
    try {
      await AuthService.register({ username, password });
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUsername(null);
  };

  const value = {
    username,
    loading,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
