const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

dotenv.config();

dbConnection();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Running test...");
});

app.use("/api/auth", userRoutes);
app.use("/api/note", noteRoutes);

// Error Handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
