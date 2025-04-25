import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (newToken: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = async () => {
    try {
      // Make a request to the backend to log the user out
      await axios.get('/auth/logout', { withCredentials: true });

      // Update the state to reflect the logout
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error('Error logging out', error);
    }
  };
  return { token, login, logout, isAuthenticated, setIsAuthenticated };
};
// This custom hook manages authentication state in a React application.
// It provides functions to log in, log out, and check if the user is authenticated.
// The authentication token is stored in local storage and is retrieved on component mount.
// The `useAuth` hook returns the token, login and logout functions, and the authentication status.
// This allows components to easily access and manage authentication state.