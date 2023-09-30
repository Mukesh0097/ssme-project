const express = require("express");
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
const authRouter = require("./routes/auth");
const prouctRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("helo world");
});
// user Authenitication & Authorization
app.use("/api/v1/auth", authRouter);
// add products
app.use("/api/products", prouctRouter);
// order
app.use("/api/order", orderRouter);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://mpprajapat459:Aty%409898@cluster0.ubfzafx.mongodb.net/E-commerce-db?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false }
  )
  .then(() => {
    console.log("server is connected to db");
  })
  .catch(console);

app.listen(PORT, () => {
  console.log("connected");
});
