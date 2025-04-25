import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { username, password });
      login(res.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Doctor Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
