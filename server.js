/********************************************************************
 *
 *  server.js
 *

 *  -----------------
 *  ✔ Create Express S
 *  ✔ Connect MongoDB
 *  ✔ Accept JSON Data
 *  ✔ Enable CORS
 *  ✔ Register API Routes
 *  ✔ Start Server
 *
 ***********************              *********************************************/

const path = require("path");

// Import Express Framework
const express = require("express");

// Import CORS package
// CORS allows frontend (HTML) to communicate with backend
const cors = require("cors");

// Load environment variables from .env file
require("dotenv").config();

// Import MongoDB Connection
const connectDB = require("./config/db");

// Import Book Routes
const bookRoutes = require("./routes/bookRoutes");


// Create Express Application
const app = express();

// Import Authentication Routes
const authRoutes = require("./routes/authRoutes");

// Connect MongoDB Database
connectDB();



// Enable CORS
// Without this your frontend cannot call backend APIs
app.use(cors());

app.use(express.static(path.join(__dirname, "frontend")));

// Parse JSON Data
// Converts incoming JSON request into JavaScript Object
app.use(express.json());


// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


// Authentication APIs
app.use("/api/auth", authRoutes);



// Register Book Routes
// Every request starting with /api/books
// will be handled inside bookRoutes.js


app.use("/api/books", bookRoutes);

app.use("/api/auth", authRoutes);

// Read Port Number from .env file
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {

    console.log("=================================");
    console.log(" Server Started Successfully");
    console.log(` Running on Port : ${PORT}`);
    console.log("=================================");

})