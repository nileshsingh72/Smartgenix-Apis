const express = require("express");
const { adminAuth } = require("../Middlewares/admin.middleware");
const { userAuth } = require("../Middlewares/user.middleware");
const cartModel = require("../model/cart.model");
const orderModel = require("../Model/order.model");
const productModel = require("../Model/product.model");

const orderRoute = express.Router();
// /for admin 
orderRoute.get("/admin", adminAuth, async (req, res) => {
  try {
    let all = await orderModel.find();
    res.json({status : true  , data : all});
  } catch (error) {
    res.json({status : false  , message : error.message}); 
  }
});
// /for user 
orderRoute.get("/user", userAuth,  async (req, res) => {
  try {
    let userOrder = await orderModel.find({userId : req.body.userId});
    res.json({staus : true , data : userOrder});
  } catch (error) {
    res.json({status : false , message : error.message});
  }
});
//post 
orderRoute.post("/create", userAuth,  async (req, res) => {
  try {
    let orderData  = await cartModel.find({userId : req.body.userId}).populate("productId")
    let total = 0;
    for (var i = 0; i < orderData.length; i++) {
      total += orderData[i].productId.price * orderData[i].quantity;
    }
  let newOrder= await orderModel.create({userId : req.body.userId, orderData : orderData , totalBill: total , deliveredAddress : req.body.address}); 
  let clearCart = await cartModel.deleteMany({userId :req.body.userId}) 

    orderData.forEach( async (el) =>{
      let noOfProduct = await productModel.find( {_id: el.productId._id })
      let updated = await cartModel.findByIdAndUpdate( el.productId._id , { quantity :Number(noOfProduct.quantity) - Number(el.quantity)   })
    })

  res.json({staus : true , data : newOrder});
} catch (error) {
    res.json({status : false , message : error.message});

}
});
// cancel the order by user
orderRoute.delete("/delete/:id", userAuth,  async (req, res) => {
  try {
    let deleteProduct  = await cartModel.findByIdAndDelete(req.params.id)
    res.json({staus : true , message : "order deleted successfully"});
} catch (error) {
    res.json({status : false , message : error.message});
}
});

 
module.exports = { orderRoute };
