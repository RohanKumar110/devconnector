if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Up and Running on PORT ${PORT}`);
});
