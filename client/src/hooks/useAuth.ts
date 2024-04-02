"use client";
import { useState } from "react";
import { login, register, changePassword, User } from "@/services/auth.service";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

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

  return {
    user,
    onLogin,
    onRegister,
    onChangePassword,
  };
};

export default useAuth;
