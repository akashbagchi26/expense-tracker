const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/expenses", expenseRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
