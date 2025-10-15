const Joi = require("joi");

const uuidSchema = Joi.string().uuid().required();

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(1).required(),
  image_url: Joi.string().required(),
  category_id: Joi.number().required(),
  is_active: Joi.boolean().optional(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  price: Joi.number().min(1).optional(),
  image_url: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
}).min(1);

module.exports = {
  uuidSchema,
  createProductSchema,
  updateProductSchema,
};
