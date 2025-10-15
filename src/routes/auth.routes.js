const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const router = Router();

// Define user routes
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);

module.exports = router;
