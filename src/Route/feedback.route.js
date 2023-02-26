const express = require("express");
const fbRoute = express.Router();
const cors = require("cors");
const { userAuth } = require("../Middlewares/user.middleware");
const { getfb, postfb, delfb, getSinglefb } = require("../Controller/feedback.controller");
const { adminAuth } = require("../Middlewares/admin.middleware");
fbRoute.use(cors());
fbRoute.use(userAuth);
// for user
fbRoute.get("/:id",  getSinglefb )
fbRoute.post("/", userAuth ,  postfb )
// for admin
fbRoute.get("/",  getfb )
fbRoute.delete("/:id", adminAuth , delfb )

module.exports = fbRoute;