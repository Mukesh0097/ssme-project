const Order = require("../model/order");
const User = require("../model/user");
const Product = require("../model/product");
const HttpError = require("../model/httpError");

const placeorder = async (req, res) => {
  //productIdsAndQuantity is arry [{id:"xyz",quantity:2}]
  const { userId, productIdsAndQuantity } = req.body;
  let userData;
  try {
    userData = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("order failed,Please try again", 500));
  }

  if (!userData) {
    return next(new HttpError("user not found for order", 404));
  }

  let productlistData;
  try {
    productlistData = await Promise.all(
      productIdsAndQuantity.map(async (element) => {
        let data;
        try {
          data = await Product.findById(element.id);
        } catch (err) {
          next(
            new HttpError(
              "products detail failed to found,please try again",
              500
            )
          );
        }

        if (!data) {
          return next(
            new HttpError(`product id ${element.id} is not exist`, 404)
          );
        }
        return { ...data, quantity: parseFloat(element.quantity) };
      })
    );
  } catch (err) {
    return next(
      new HttpError("products detail failed to found,please try again", 500)
    );
  }

  const orderProductDataArry = productlistData.map((x) => {
    return {
      productId: x._doc._id,
      productCategory: x._doc.productCategory,
      productName: x._doc.productName,
      quantity: x.quantity,
      price: x._doc.productPrice,
      totalPrice: x._doc.productPrice * x.quantity,
    };
  });

  if (!orderProductDataArry) {
    return next(new HttpError("order arry is not ready", 500));
  }

  let order = new Order({
    userId: userId,
    products: orderProductDataArry,
  });
  try {
    order = await order.save();
  } catch (err) {
    return next(new HttpError("order not placed,please try again", 500));
  }
  res.json({ message: "order is placed", orderId: order._id }).status(200);
};

const cancelOrder = async (req, res) => {
  const { orderId, productIds } = req.body;
  try {
    const orderData = await Order.findById(orderId);
    if (!orderData) {
      throw new Error("orderId is not exists");
    }

    let data = {
      product: orderData.products,
    };
    productIds.forEach((element) => {
      const updatedOrder = data.product.filter((x) => x.productId !== element);
      data = { ...data, product: updatedOrder };
    });

    const updatedOrder = await Order.findOneAndReplace(
      { _id: orderId },
      {
        products: data.product,
      },
      { new: true }
    );

    res.json({ data: updatedOrder }).status(200);
  } catch (err) {}
};

module.exports = { placeorder, cancelOrder };
