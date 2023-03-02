require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const { userRoute } = require("./Route/user.route");
const { productRoute } = require("./Route/product.route");
const CartRoute = require("./Route/cart.route");
const { orderRoute } = require("./Route/order.route");
const fbRoute = require("./Route/feedback.route");
const productModel = require("./Model/product.model");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", CartRoute);
app.use("/order", orderRoute);
app.use("/feedback", fbRoute);

app.get("/", (req, res) => {
  res.send("welcome to SmartGenix Server");
});

app.listen(process.env.PORT, async (req, res) => {
  console.log(`http://localhost:${process.env.PORT}`);
  try {
    await connectDB();
    console.log("DB connection established");
  } catch (error) {
    console.log(error.message);
  }
});
