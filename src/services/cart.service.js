const db = require("../db/models");

const addToCart = async (userId, cartData) => {
  console.log('cartData: ', cartData);
  console.log('userId: ', userId);
  try {
    const { product_id, quantity } = cartData;
    const existingCartItem = await db.cart.findOne({
      where: {
        product_id,
        user_id: userId
      }
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return existingCartItem;
    }

    const newCartItem = await db.cart.create({
      user_id: userId,
      product_id,
      quantity
    });
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

const removeCartItem = async (userId, productId) => {
  try {
    const result = await db.cart.destroy({
      where: {
        user_id: userId,
        product_id: productId
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getCartItems = async (userId) => {
  try {
    const items = await db.cart.findAll({
      where: { user_id: userId },
      attributes: ['id', 'uuid', 'product_id', 'quantity'],
      include: [{
        model: db.products,
        as: 'product',
        attributes: ['id', 'uuid', 'name', 'price', 'image_url',]
      }]
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
