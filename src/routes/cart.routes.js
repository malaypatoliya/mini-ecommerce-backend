const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/add", cartController.addToCart);
router.delete("/remove/:uuid", cartController.removeFromCart);
router.get("/", cartController.getCart);

module.exports = router;
