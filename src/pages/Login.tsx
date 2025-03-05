import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.user !== null) {
      navigate("/");
    }
  }, []);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        return alert(data.message);
      }
      const obj = {
        user: {
          _id: data.Data._id,
          name: data.Data.name,
          email: data.Data.name,
          walletPoints: data.Data.walletPoints,
        },
        token: data.Data.token,
      };

      setAuth(obj);

      localStorage.setItem("bidai-mart", JSON.stringify(obj));

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
