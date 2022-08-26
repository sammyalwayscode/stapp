const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

router.route("/").get(getAllProducts);
router.route("/:id").get(getOneProduct);
router.route("/uploadProduct").post(upload, createProduct);
router.route("/update/:id").patch(upload, updateProduct);
router.route("/remove/:id").delete(deleteProduct);

module.exports = router;
