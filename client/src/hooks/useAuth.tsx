"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  login,
  register,
  changePassword,
  User,
  getUserDetails,
} from "@/services/auth.service";

interface AuthContextType {
  user: User | null;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, name: string) => void;
  onChangePassword: (oldPassword: string, newPassword: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails();
        setUser(data.user);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      setUser(response.user);
      localStorage.setItem("token", response.token);
    } catch (error) {
      console.error(error);
    }
  };

  const onRegister = async (email: string, password: string, name: string) => {
    const response = await register(email, password, name);
    setUser(response.user);
  };

  const onChangePassword = async (oldPassword: string, newPassword: string) => {
    await changePassword(oldPassword, newPassword);
  };

  const values = {
    user,
    onLogin,
    onRegister,
    onChangePassword,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
