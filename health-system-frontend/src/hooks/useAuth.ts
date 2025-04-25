import { useState, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !token;

  return { token, login, logout, isAuthenticated };
};
// This custom hook manages authentication state in a React application.
// It provides functions to log in, log out, and check if the user is authenticated.
// The authentication token is stored in local storage and is retrieved on component mount.
// The `useAuth` hook returns the token, login and logout functions, and the authentication status.
// This allows components to easily access and manage authentication state.