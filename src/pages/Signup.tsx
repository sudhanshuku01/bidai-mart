import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Layout from "../layout/Layout";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth] = useAuth();
  const navigate = useNavigate();
  const query = useQuery();
  const ref = query.get("ref");

  useEffect(() => {
    if (auth.user !== null) {
      navigate("/");
    }
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, ref }),
      });

      const data = await res.json();
      if (!data.success) {
        return alert(data.message);
      }

      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <Layout>
      <div className="signup-container">
        <h2 className="signup-title">Create an Account</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            Register
          </button>
        </form>
        <p className="login-redirect">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Signup;
