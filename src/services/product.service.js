const db = require("../db/models");

const getProductList = async () => {
  try {
    const products = await db.products.findAll({
      attributes: ["uuid", "name", "price", "image_url", "stock", "is_active", "category_id"],
      include: [
        {
          model: db.category,
          as: "category",
          attributes: ["uuid", "name", "is_active"]
        },
      ],
    });
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductByUUID = async (uuid) => {
  try {
    const product = await db.products.findOne({
      where: { uuid },
      attributes: ["uuid", "name", "price", "image_url", "stock", "is_active"],
      include: [
        {
          model: db.category,
          as: "category",
          attributes: ["uuid", "name", "is_active"]
        },
      ],
    });
    return product;
  } catch (error) {
    throw error;
  }
};

const getProductIdByUUID = async (uuid) => {
  try {
    const product = await db.products.findOne({ where: { uuid } });
    return product ? product.id : null;
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

getCategory = async () => {
  try {
    const category = await db.category.findAll({
      where: { is_active: true },
      attributes: ["id", "uuid", "name", "is_active"],
    });
    return category;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProductList,
  getProductByUUID,
  getProductIdByUUID,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategory
};
