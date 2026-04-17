const express = require("express");
const router = express.Router();

const { search, searching } = require("../controllers/searchController");
const protect = require("../middleware/authMiddleware");


router.get("/", protect, search);
router.post("/", protect, searching);
module.exports = router;
