const productService = require("../services/product.service");
const { uuidSchema, createProductSchema, updateProductSchema } = require("../validators/product.validator");

const getProductList = async (req, res) => {
  try {
    const products = await productService.getProductList();
    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error in getProductList:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProductByUUID = async (req, res) => {
  try {
    const { error } = uuidSchema.validate(req.params.uuid);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const product = await productService.getProductByUUID(req.params.uuid);
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error in getProductByUUID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createProdcut = async (req, res) => {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const newProduct = await productService.createProduct(req.body);

    return res.status(201).json({
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error in createProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { error: paramError } = uuidSchema.validate(req.params.uuid);
    if (paramError)
      return res.status(400).json({ message: paramError.details[0].message });

    const { error: bodyError } = updateProductSchema.validate(req.body);
    if (bodyError)
      return res.status(400).json({ message: bodyError.details[0].message });

    const productExists = await productService.getProductByUUID(req.params.uuid);
    if (!productExists) return res.status(404).json({ message: "Product not found" });

    const updatedUser = await productService.updateProduct(req.params.uuid, req.body);
    if (!updatedUser || updatedUser[0] === 0) {
      return res.status(404).json({ message: "Product not updated" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { error } = uuidSchema.validate(req.params.uuid);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const productExists = await productService.getProductByUUID(req.params.uuid);
    if (!productExists) return res.status(404).json({ message: "Product not found" });

    const result = await productService.deleteProduct(req.params.uuid);
    if (!result) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadProductImage = async (req, res) => {
  try {
    const { error: paramError } = uuidSchema.validate(req.params.uuid);
    if (paramError)
      return res.status(400).json({ message: paramError.details[0].message });

    console.log("req.file: ", req?.files);
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files[0];
    console.log('file: ', file);

    // update the file name in the database
    await productService.updateProduct(req.params.uuid, {
      image_url: file.filename
    });

    // Placeholder for avatar upload logic
    return res
      .status(200)
      .json({ message: "Product image uploaded successfully" });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      // Multer-specific errors
      if (error.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File too large. Max 2MB allowed" });
      }
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(400)
          .json({ message: "Too many files. Max 1 allowed" });
      }
      return res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      // Other errors
      return res.status(500).json({ message: error.message });
    }
  }
};

const getCategoryList = async (req, res) => {
  try {
    const category = await productService.getCategory();
    return res.status(200).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error in getProductList:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProductList,
  getProductByUUID,
  createProdcut,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getCategoryList
};
