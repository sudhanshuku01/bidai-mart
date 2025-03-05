import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../layout/Layout";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  extra_views: number;
  seller: { name: string; email: string };
}

interface Seller {
  name: string;
  email: string;
  totalExtraViews: number;
}

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [data, setData] = useState<{
    totalListings: Product[];
    topSellers: Seller[];
    topPerformingListings: Product[];
  }>({
    totalListings: [],
    topSellers: [],
    topPerformingListings: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/dashboard-stats",
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        console.log(data);
        if (data.success) {
          setData(data.data);
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    fetchStats();
  }, [auth]);

  return (
    <Layout>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        {/* Admin Info */}
        <div className="admin-info">
          <p>
            <strong>Name:</strong> {auth.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {auth.user?.email}
          </p>
        </div>

        {/* Total Listings */}
        <h2>Total Listings</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.totalListings.map((product) => (
              <tr key={product._id}>
                <td>{product.seller.name}</td>
                <td>{product.seller.email}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Top 5 Sellers */}
        <h2>Top Sellers</h2>
        <ul className="top-sellers">
          {data.topSellers.map((seller, index) => (
            <li key={index} className="seller-card">
              <p>
                <strong>{seller.name}</strong>
              </p>
              <p>{seller.email}</p>
              <p>Total Purchased Views: {seller.totalExtraViews}</p>
            </li>
          ))}
        </ul>

        {/* Top Performing Listings */}
        <h2>Top Performing Listings</h2>
        <ul className="top-performing-listings">
          {data.topPerformingListings.map((product) => (
            <li key={product._id} className="product-card">
              <p>
                <strong>{product.name}</strong>
              </p>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Purchased Views: {product.extra_views}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
