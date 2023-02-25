const express = require("express");
const { userRegister, userSignin, delUser } = require("../Controller/user.controller");
const { adminAuth } = require("../Middlewares/admin.middleware");
const { userModel } = require("../Model/user.model");

const userRoute = express.Router();
// /for test use
userRoute.get("/", async (req, res) => {
  try {
    let alluser = await userModel.find();
    res.json(alluser);
  } catch (error) {
    res.json(error.message);
  }
});

userRoute.post("/register", userRegister);
userRoute.post("/login", userSignin);
userRoute.delete("/user/:id", adminAuth , delUser );
module.exports = { userRoute };
