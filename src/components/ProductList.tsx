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
        const res = await axios.get("http://localhost:5000/api/product");
        setProducts(res.data.data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <Link
          to={`/product/${product._id}`}
          key={product._id}
          className="product-link"
        >
          <div className="product-card">
            <div className="image-container">
              <img
                src={`https://source.unsplash.com/300x200/?product,${product.name}`}
                alt={product.name}
                className="product-image"
              />
              <span className="seller-name">{product.seller.name}</span>
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
