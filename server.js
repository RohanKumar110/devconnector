if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profile");

// Unmount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Up and Running on PORT ${PORT}`);
});
