import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [auth, setAuth] = useAuth();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Bidai-Mart
        </Link>
        <nav>
          {auth?.user ? (
            <>
              <Link to="/profile" className="nav-link">
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
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
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
