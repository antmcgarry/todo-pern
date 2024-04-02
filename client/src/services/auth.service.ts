import createAxiosInstance from "./axios-instance";

export type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};

interface LoginResponse {
  token: string;
  user: User;
}

const AuthService = createAxiosInstance(
  process.env.NEXT_PUBLIC_API_AUTH_URL || "http://localhost:3000"
);

const login = async (email: string, password: string) => {
  const response = await AuthService.post<LoginResponse>("/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};

interface RegisterResponse {
  token: string;
  user: User;
}

const register = async (email: string, password: string, name: string) => {
  const response = await AuthService.post<RegisterResponse>(
    "/v1/auth/register",
    {
      email,
      password,
      name,
    }
  );
  return response.data;
};

const changePassword = async (oldPassword: string, newPassword: string) => {
  await AuthService.put("/v1/auth/change-password", {
    oldPassword,
    newPassword,
  });
};

export { login, register, changePassword };
