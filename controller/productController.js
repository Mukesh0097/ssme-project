const HttpError = require("../model/httpError");
const Product = require("../model/product");

const allProducts = async (req, res) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    return next(new HttpError("internal server error", 500));
  }
  if (!products) {
    return next(new HttpError("products are not exist", 404));
  }
  res.json({ data: products }).status(200);
};
const addNewProduct = async (req, res) => {
  const { Name, Category, image, description, price, Availability } = req.body;
  const newProduct = new Product({
    productName: Name,
    productCategory: Category,
    productImage: image,
    description: description,
    productPrice: price,
    availability: Availability,
  });
  try {
    await newProduct.save();
  } catch (err) {
    return next(new HttpError("product can't add please try again", 500));
  }
  res.json({ message: "product is inserted" }).status(200);
};

const updateProductdata = async (req, res) => {
  const { id, Name, Category, image, description, price, Availability } =
    req.body;

  let updatedProduct;
  try {
    updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        productName: Name,
        productCategory: Category,
        productImage: image,
        description: description,
        productPrice: price,
        availability: Availability,
      },
      { new: true }
    );
  } catch (err) {
    return next(new HttpError("product can't found,please try again", 500));
  }

  if (!updatedProduct) {
    return next(new HttpError("prouduct is not found", 404));
  }

  res.json({ message: "product is updated", updateddata: updatedProduct });
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  let deletedata;
  try {
    deletedata = await Product.findByIdAndRemove(id);
  } catch (err) {
    return next(new HttpError("product can't delete,Please try again", 500));
  }

  if (!deletedata) {
    return next(new HttpError("product is not found", 404));
  }
};

module.exports = {
  allProducts,
  addNewProduct,
  updateProductdata,
  deleteProduct,
};
