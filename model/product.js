const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  productImage: { type: String, required: true },
  description: { type: String, required: true },
  productPrice: { type: Number, required: true },
  availability: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
