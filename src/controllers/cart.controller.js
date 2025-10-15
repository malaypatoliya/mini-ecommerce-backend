const cartService = require("../services/cart.service");
const { addCartSchema, productIdParamSchema, updateCartSchema } = require("../validators/cart.validator");

const addToCart = async (req, res) => {
  try {

    const { error: bodyError } = addCartSchema.validate(req.body);
    if (bodyError)
      return res.status(400).json({ message: bodyError.details[0].message });

    const cartItem = await cartService.addToCart(req.body);
    return res.status(201).json({ message: "Product added to cart", data: cartItem });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { error: paramError } = productIdParamSchema.validate(req.params.productId);
    if (paramError)
      return res.status(400).json({ message: paramError.details[0].message });

    const { error: bodyError } = updateCartSchema.validate(req.body);
    if (bodyError)
      return res.status(400).json({ message: bodyError.details[0].message });

    const updatedItem = await cartService.updateCartItem(req.params.productId, req.body);
    if (!updatedItem) return res.status(404).json({ message: "Cart item not found" });

    return res.status(200).json({ message: "Cart updated successfully", data: updatedItem });
  } catch (error) {
    console.error("Error in updateCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { error: paramError } = productIdParamSchema.validate(req.params.productId);
    if (paramError)
      return res.status(400).json({ message: paramError.details[0].message });

    console.log('req.params.productId: ', req.params.productId);
    const removed = await cartService.removeCartItem(req.params.productId);
    if (!removed) return res.status(404).json({ message: "Cart item not found" });

    return res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const cartItems = await cartService.getCartItems();
    return res.status(200).json({ message: "Cart fetched successfully", data: cartItems });
  } catch (error) {
    console.error("Error in getCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  updateCart,
  removeFromCart,
  getCart,
};
