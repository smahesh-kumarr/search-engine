const express = require("express");
const router = express.Router();
const { register, login, search } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/search", protect, search);

module.exports = router;
