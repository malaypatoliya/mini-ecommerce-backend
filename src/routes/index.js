const { Router } = require("express");
const productRoutes = require("./products.routes");
const cartRoutes = require("./cart.routes");
const authRoutes = require("./auth.routes");
const { isAuth } = require("../middleware/auth.middleware");

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
