import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [auth] = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.user === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/role", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setRole(data.role);
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [auth]);

  if (loading) return <p>Loading...</p>;

  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Profile;
