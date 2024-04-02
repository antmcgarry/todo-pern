import axios from "axios";

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
