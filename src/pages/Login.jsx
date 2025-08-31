// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom"; // ✅ import useNavigate
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // ✅ hook for redirect

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
      navigate("/dashboard"); // ✅ redirect after successful login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page fade-in">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to Skill Swap</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Login
        </button>

        <p className="switch-auth">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
