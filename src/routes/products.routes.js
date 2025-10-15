const { Router } = require("express");
const productController = require("../controllers/product.controller");
const upload = require("../utils/fileUpload");

const router = Router();

// Define user routes
router.get("/", productController.getProductList);
router.get("/:uuid", productController.getProductByUUID);
router.post("/", productController.createProdcut);
router.put("/:uuid", productController.updateProduct);
router.delete("/:uuid", productController.deleteProduct);

router.post(
  "/updload-image/:uuid",
  upload.array("product", 1),
  productController.uploadProductImage
);

module.exports = router;
