const Joi = require("joi");

// Validate productId in URL params
const productIdParamSchema = Joi.object({
  product_id: Joi.number().integer().min(1).required()
});

// Validate request body when adding product to cart
const addCartSchema = Joi.object({
  product_id: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).optional().default(1)
});

// Validate request body when updating quantity
const updateCartSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required()
});

module.exports = {
  productIdParamSchema,
  addCartSchema,
  updateCartSchema
};
