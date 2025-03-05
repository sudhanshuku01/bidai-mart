import { useAuth } from "../context/AuthContext";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  views: number;
}

const UserDashboard = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/user`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Error fetching user products", error);
      }
    };

    fetchUserProducts();
  }, [auth.token]);

  const referralLink = `http://localhost:5173/signup?ref=${auth.user?._id}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <Layout>
      <div className="dashboard">
        {/* User Info Section */}
        <div className="user-info">
          <h2>Welcome, {auth.user?.name}!</h2>
          <p>Email: {auth.user?.email}</p>
          <div className="referral-section">
            <p>
              <strong>Referral Link:</strong>
              <span className="referral-link">{referralLink}</span>
            </p>
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div>
            <p>
              <span>Wallet Points: {auth.user?.walletPoints}</span>
            </p>
          </div>
        </div>

        {/* User Products Section */}
        <div className="products-container">
          <h2>Your Items</h2>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <img
                    src={`https://source.unsplash.com/300x200/?product`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">₹{product.price}</p>
                    <p className="views">Remaining Views: {product.views}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products listed yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
