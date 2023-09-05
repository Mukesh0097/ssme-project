const express = require("express");
const orderRouter = express.Router();
const { placeorder, cancelOrder } = require("../controller/ordercontroller");

orderRouter.post("/new", placeorder);
orderRouter.patch("/cancel", cancelOrder);
// orderRouter.update("/update");

module.exports = orderRouter;
