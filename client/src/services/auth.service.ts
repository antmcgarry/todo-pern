import createAxiosInstance from "./axios-instance";

export type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};

interface AuthResponse {
  token: string;
  user: User;
}

const AuthService = createAxiosInstance(
  process.env.NEXT_PUBLIC_API_AUTH_URL || "http://localhost:3000"
);

const login = async (email: string, password: string) => {
  const response = await AuthService.post<AuthResponse>("/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};

const getUserDetails = async () => {
  const response = await AuthService.get<Pick<AuthResponse, "user">>(
    "/v1/auth/get-user"
  );
  return response.data;
};

const register = async (email: string, password: string, name: string) => {
  const response = await AuthService.post<AuthResponse>("/v1/auth/register", {
    email,
    password,
    name,
  });
  return response.data;
};

const changePassword = async (oldPassword: string, newPassword: string) => {
  await AuthService.put("/v1/auth/change-password", {
    oldPassword,
    newPassword,
  });
};

export { login, register, changePassword, getUserDetails };
