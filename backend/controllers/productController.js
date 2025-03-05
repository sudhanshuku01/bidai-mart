import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const seller = req.user.id; // Get seller ID from authMiddleware

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      seller,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("seller", "name") // Fetch only seller's name
      .select("-__v"); // Exclude __v field

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // If views are already 0, ask user to purchase extra views
    if (product.views <= 0) {
      return res.status(403).json({
        success: false,
        message: "Views exhausted. Please purchase extra views to continue.",
      });
    }

    // Decrease views count
    product.views -= 1;
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ views: { $gt: 0 } })
      .populate("seller", "name") // Fetch only seller's name
      .select("-__v"); // Exclude __v field

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getUserProducts = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from middleware

    const products = await Product.find({ seller: userId })
      .select("-seller") // Exclude seller field
      .sort({ createdAt: -1 }); // Sort by latest created

    return res.status(200).json({
      success: true,
      message: "User products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching user products:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};
