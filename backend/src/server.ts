
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/database";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// Health check API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SkillMesh API",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SkillMesh server running on port ${PORT}`);
});


app.get("/api/health/db", async (req, res) => {
  try {
    const userCount = await prisma.user.count();

    res.status(200).json({
      success: true,
      message: "PostgreSQL connected successfully!",
      totalUsers: userCount,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});
