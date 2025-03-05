import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/Layout";

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  views: number;
  seller: { name: string };
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Track component mount state

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/product/${id}`
        );
        if (isMounted) {
          setProduct(res.data.data);
        }
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false; // Cleanup function to prevent duplicate API calls
    };
  }, [id]);

  if (loading) return <p className="loading-text">Loading product...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <Layout>
      <div className="product-details-container">
        {product && (
          <div className="product-card">
            <img
              src={`https://plus.unsplash.com/premium_photo-1681313824743-7b5a2a635938?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lfGVufDB8fDB8fHww`}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
              <p className="product-seller">Seller: {product.seller.name}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
