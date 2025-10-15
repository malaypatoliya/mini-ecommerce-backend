const db = require("../db/models");

const getProductList = async () => {
  try {
    const products = await db.products.findAll({
      include: [{ model: db.category, as: "category" }],
    });
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductByUUID = async (uuid) => {
  try {
    const product = await db.products.findOne({ where: { uuid } });
    return product;
  } catch (error) {
    throw error;
  }
};

const createProduct = async (productData) => {
  try {
    const newProduct = await db.products.create(productData);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (uuid, productData) => {
  try {
    const updatedProduct = await db.products.update(productData, { where: { uuid } });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (uuid) => {
  try {
    const result = await db.products.destroy({ where: { uuid } });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProductList,
  getProductByUUID,
  createProduct,
  updateProduct,
  deleteProduct,
};
