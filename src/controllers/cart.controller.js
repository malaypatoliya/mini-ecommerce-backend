const cartService = require("../services/cart.service");
const userService = require("../services/users.service");
const productService = require("../services/product.service");
const { addCartSchema } = require("../validators/cart.validator");
const { uuidSchema } = require("../validators/product.validator");

const addToCart = async (req, res) => {
  try {
    const userUUID = req.user.uuid;

    const { error: bodyError } = addCartSchema.validate(req.body);
    if (bodyError)
      return res.status(400).json({ message: bodyError.details[0].message });

    const user = await userService.getUserByUUID(userUUID);
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log('user: ', user);

    const cartItem = await cartService.addToCart(user.id, req.body);
    return res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userUUID = req.user.uuid;

    const { error: paramError } = uuidSchema.validate(req.params.uuid);
    if (paramError)
      return res.status(400).json({ message: paramError.details[0].message });

    const user = await userService.getUserByUUID(userUUID);
    if (!user) return res.status(404).json({ message: "User not found" });

    const productId = await productService.getProductIdByUUID(req.params.uuid);
    if (!productId) return res.status(404).json({ message: "Product not found" });

    const removed = await cartService.removeCartItem(user.id, productId);
    if (!removed) return res.status(404).json({ message: "Cart item not found" });

    return res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userUUID = req.user.uuid;

    const user = await userService.getUserByUUID(userUUID);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItems = await cartService.getCartItems(user.id);
    return res.status(200).json({ message: "Cart fetched successfully", data: cartItems });
  } catch (error) {
    console.error("Error in getCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
