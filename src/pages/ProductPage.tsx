import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProductPage: React.FC = () => {
  const { products, fetchProducts } = useProductContext();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [packageType, setPackageType] = useState<"BID_49" | "BID_99">("BID_49");

  // Track views
  const handleViewProduct = async (productId: string) => {
    try {
      await axios.post(`/api/products/view/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error updating views", error);
    }
  };

  // Handle Razorpay Payment
  const handleBuyViews = async () => {
    try {
      const { data } = await axios.post("/api/payment/order", {
        productId: selectedProduct,
        packageType,
      });

      const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: data.amount,
        currency: "INR",
        name: "BID.ai",
        description: "Purchase Extra Views",
        order_id: data.order_id,
        handler: async function (response: any) {
          await axios.post("/api/payment/verify", response);
          toast.success("Payment successful! Views updated.");
          fetchProducts();
        },
        prefill: { email: "user@example.com" },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error", error);
      toast.error("Payment failed!");
    }
  };

  return (
    <div className="product-page">
      <h1>Product Listings</h1>
      {products.map((product) => (
        <div
          key={product._id}
          className="product-card"
          onClick={() => handleViewProduct(product._id)}
        >
          <h3>{product.name}</h3>
          <p>Views: {product.views}</p>
          {product.views >= 100 && (
            <button onClick={() => setSelectedProduct(product._id)}>
              Buy More Views
            </button>
          )}
        </div>
      ))}

      {/* Purchase Modal */}
      {selectedProduct && (
        <div className="modal">
          <h2>Purchase Extra Views</h2>
          <select
            value={packageType}
            onChange={(e) =>
              setPackageType(e.target.value as "BID_49" | "BID_99")
            }
          >
            <option value="BID_49">BID @49 (49 Views)</option>
            <option value="BID_99">BID @99 (99 Views)</option>
          </select>
          <button onClick={handleBuyViews}>Pay Now</button>
          <button onClick={() => setSelectedProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
