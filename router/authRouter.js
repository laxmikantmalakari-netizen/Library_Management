const express = require('express');
const router = express.Router();

// Fixed: Changed 'authcontrollers' to 'authControllers' with a capital 'C'
const { registerUser, loginUser } = require("../controllers/authControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

