

/********************************************************************
 *  server.js
 *  -----------------
 *  ✔ Create Express Server
 *  ✔ Connect MongoDB
 *  ✔ Accept JSON Data
 *  ✔ Enable CORS
 *  ✔ Register API Routes
 *  ✔ Start Server
 *******************************************************************/

const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 1. Import Database Connection and Routes
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

// 2. Initialize Express Application
const app = express();

// 3. Connect to MongoDB
connectDB();

// 4. Global Middleware Configuration
app.use(cors());
app.use(express.json()); // Parses incoming JSON data
app.use(express.static(path.join(__dirname, "frontend"))); // Serves frontend files

// 5. Frontend Main Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// 6. Register API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// 7. Define Port and Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("=================================");
    console.log(" Server Started Successfully     ");
    console.log(` Running on Port : ${PORT}       `);
    console.log("=================================");
}); // Fixed missing closing bracket here
