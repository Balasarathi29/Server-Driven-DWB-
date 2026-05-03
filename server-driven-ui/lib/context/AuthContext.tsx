"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import * as authAPI from "@/lib/api/auth.api";
import { User, Institution } from "@/lib/types/auth.types";

interface AuthContextType {
  user: User | null;
  institution: Institution | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    adminName: string;
    institutionName: string;
    email: string;
    password: string;
    subdomain: string;
  }) => Promise<void>;
  logout: () => void;
  updateInstitution: (name: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem("accessToken");
    if (token) {
      authAPI
        .verifyToken(token)
        .then((userData) => {
          setUser(userData);
          // Retrieve institution from localStorage if available
          const savedInstitution = localStorage.getItem("institution");
          if (savedInstitution) {
            setInstitution(JSON.parse(savedInstitution));
          }
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("institution");
          router.push("/login");
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    const result = await authAPI.login(email, password);
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    // Store institution if available
    if (result.institution) {
      localStorage.setItem("institution", JSON.stringify(result.institution));
      setInstitution(result.institution);
    }

    setUser(result.user);
    router.push("/dashboard");
  };

  const register = async (data: {
    adminName: string;
    institutionName: string;
    email: string;
    password: string;
    subdomain: string;
  }) => {
    const result = await authAPI.register(data);
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    // Store institution
    localStorage.setItem("institution", JSON.stringify(result.institution));
    setInstitution(result.institution);

    setUser(result.user);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("institution");
    setUser(null);
    setInstitution(null);
    router.push("/login");
  };

  const updateInstitution = async (name: string) => {
    try {
      const updated = await authAPI.updateInstitution({ name });
      setInstitution(updated);
      localStorage.setItem("institution", JSON.stringify(updated));
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        institution,
        login,
        register,
        logout,
        updateInstitution,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
