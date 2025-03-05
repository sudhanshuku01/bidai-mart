import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css"; // Import the CSS file

const Header = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Bidai-Mart
        </Link>
        <nav className="nav">
          {auth?.user ? (
            <>
              <Link
                to="/profile"
                className={`nav-link ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
              >
                Profile
              </Link>
              <button
                className="logout-btn"
                onClick={() => {
                  setAuth({ user: null, token: "" });
                  localStorage.removeItem("bidai-mart");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`nav-link ${
                  location.pathname === "/login" ? "active" : ""
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`nav-link ${
                  location.pathname === "/signup" ? "active" : ""
                }`}
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
