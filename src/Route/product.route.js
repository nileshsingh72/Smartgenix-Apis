const express = require("express");
const productRoute = express.Router();
const {
  getItem,
  createItem,
  createManyItems,
  delProduct,
  updatePQ,
  updateProduct,
  singleProd,
} = require("../Controller/products.controller");
const { adminAuth } = require("../Middlewares/admin.middleware");
productRoute.get("/", getItem);
productRoute.get("/:id", singleProd);
productRoute.post("/create", adminAuth, createItem);
productRoute.post("/createmany", adminAuth, createManyItems);
productRoute.delete("/:id", adminAuth, delProduct);
productRoute.patch("/:id", adminAuth, updatePQ);
productRoute.put("/:id", adminAuth, updateProduct);

module.exports = { productRoute };
