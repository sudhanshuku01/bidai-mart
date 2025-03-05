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
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/product/`,
        formData,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (res.data.success) {
        setProducts([...products, res.data.data]);
        setFormData({ name: "", description: "", price: "" });
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="user-dashboard-container">
        <div className="user-dashboard-info">
          <h2>Welcome, {auth.user?.name}!</h2>
          <p>Email: {auth.user?.email}</p>
          <div className="user-dashboard-referral">
            <p>
              <strong>Referral Link:</strong>
              <span className="user-dashboard-referral-link">
                {referralLink}
              </span>
            </p>
            <button className="user-dashboard-copy-btn" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="user-dashboard-wallet">
            Wallet Points: {auth.user?.walletPoints}
          </p>
        </div>

        <div className="user-dashboard-add-product">
          <h2>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        <div className="user-dashboard-products">
          <h2>Your Items</h2>
          <div className="user-dashboard-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="user-dashboard-product-card">
                  <img
                    src={`https://plus.unsplash.com/premium_photo-1681313824743-7b5a2a635938?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lfGVufDB8fDB8fHww`}
                    alt={product.name}
                    className="user-dashboard-product-image"
                  />
                  <div className="user-dashboard-product-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="user-dashboard-price">₹{product.price}</p>
                    <p className="user-dashboard-views">
                      Remaining Views: {product.views}
                    </p>
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
