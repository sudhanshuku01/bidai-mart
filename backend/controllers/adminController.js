import Product from "../models/Product.js";
import User from "../models/User.js";

// Get Admin Dashboard Stats
export const getAdminDashboardStats = async (req, res) => {
  try {
    // Fetch all product listings
    console.log("okey");
    const totalListings = await Product.find().populate("seller", "name email");

    // Top Sellers - Sorted by extra_views purchased
    const topSellers = await User.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "seller",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          totalExtraViews: { $sum: "$products.extra_views" },
        },
      },
      { $sort: { totalExtraViews: -1 } },
      { $limit: 5 }, // Get top 5 sellers
    ]);

    // Top Performing Listings - Sorted by extra_views
    const topPerformingListings = await Product.find()
      .sort({ extra_views: -1 })
      .limit(5)
      .populate("seller", "name email");

    return res.status(200).json({
      success: true,
      message: "Admin Dashboard Stats Fetched",
      data: {
        totalListings,
        topSellers,
        topPerformingListings,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching admin stats",
    });
  }
};
