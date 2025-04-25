import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
// This code creates an Axios instance with a base URL and sets up an interceptor to include a token in the headers of each request if it exists in local storage. This is useful for making authenticated requests to a backend API.