const mongoose = require("mongoose");

const subSchema = mongoose.Schema(
  {
    productId: {
      type: String,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
  },
  { _id: false }
);
const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [subSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
