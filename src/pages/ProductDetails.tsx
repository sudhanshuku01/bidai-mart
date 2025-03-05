import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


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
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
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

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-details-page">
      {product && (
        <div className="product-detail-card">
          <img
            src={`https://source.unsplash.com/500x300/?product,${product.name}`}
            alt={product.name}
            className="product-detail-image"
          />
          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">₹{product.price}</p>
            <p className="product-views">Views Remaining: {product.views}</p>
            <p className="product-seller">Seller: {product.seller.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
