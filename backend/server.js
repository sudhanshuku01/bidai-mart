import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allows cookies & authentication headers
  })
);

// Middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("all set");
});
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server listening at port" + PORT);
});
