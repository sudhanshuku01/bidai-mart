import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  getUserProducts,
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new product (only for authenticated sellers)
router.post("/", authMiddleware, createProduct);

router.get("/user", authMiddleware, authMiddleware, getUserProducts);

// Get a product by ID (decrease views on access)
router.get("/:id", getProductById);

// Get all product views greater than 0
router.get("/", getProducts);

export default router;
