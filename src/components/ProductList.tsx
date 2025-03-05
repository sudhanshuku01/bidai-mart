import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  views: number;
  seller: { name: string };
}

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/product`
        );
        setProducts(res.data.data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="loading-message">Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link
          to={`/product/${product._id}`}
          key={product._id}
          className="product-item"
        >
          <div className="product-card">
            <div className="product-image-wrapper">
              <img
                src={`https://plus.unsplash.com/premium_photo-1681313824743-7b5a2a635938?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lfGVufDB8fDB8fHww`}
                alt={product.name}
                className="product-image"
              />
              <span className="product-seller">
                Sold by: {product.seller.name}
              </span>
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
