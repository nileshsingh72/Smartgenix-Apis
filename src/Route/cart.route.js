const express = require("express");
const CartRoute = express.Router();
const cors = require("cors");
const { userAuth } = require("../Middlewares/user.middleware");
const { postItem, updateQ, getItem, delItem } = require("../Controller/cart.controller");
CartRoute.use(cors());
CartRoute.use(userAuth);

CartRoute.get("/items",getItem )
CartRoute.put("/items", updateQ)
CartRoute.post("/items", postItem )
CartRoute.delete("/items/:id",delItem )

module.exports = CartRoute;