const db = require("../db/models");

const addToCart = async (cartData) => {
  try {
    const { product_id, quantity } = cartData;
    const existingCartItem = await db.cart.findOne({ where: { product_id: product_id } });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return existingCartItem;
    }

    const newCartItem = await db.cart.create({ product_id, quantity });
    return newCartItem;
  } catch (error) {
    throw error;
  }
};

const updateCartItem = async (product_id, cartData) => {
  try {
    const { quantity } = cartData;
    const cartItem = await db.cart.findOne({ where: { product_id } });
    if (!cartItem) return null;

    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItem;
  } catch (error) {
    throw error;
  }
};

const removeCartItem = async (product_id) => {
  try {
    const result = await db.cart.destroy({ where: { product_id } });
    return result;
  } catch (error) {
    throw error;
  }
};

const getCartItems = async () => {
  try {
    const items = await db.cart.findAll({
      include: [{ model: db.products, as: 'product' }]
    });
    return items;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCartItems,
};
