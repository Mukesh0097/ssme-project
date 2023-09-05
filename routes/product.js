const express = require("express");
const {
  addNewProduct,
  updateProductdata,
  deleteProduct,
  allProducts,
} = require("../controller/productController");
const productRouter = express.Router();

productRouter.get("/list", allProducts);
productRouter.post("/new", addNewProduct);
productRouter.patch("/update", updateProductdata);
productRouter.delete("/delete", deleteProduct);

module.exports = productRouter;
