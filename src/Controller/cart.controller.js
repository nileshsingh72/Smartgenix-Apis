const cartModel = require("../Model/cart.model");

// ### POST ITEM IN CART 
const postItem = async(req, res) => {
    try {
      const allCartItems = await cartModel.find({
        userId: req.body.userId,
        productId: req.body.productId,
      })
      if (allCartItems.length >= 1 ) {
        const UpdatedCart = await cartModel.findByIdAndUpdate(
          allCartItems[0]._id,
          { quantity: allCartItems[0].quantity + 1 }
        );
        res.status(200).json({
          status:true,
          data: UpdatedCart,
        });
      } else {
        const cartItems = await cartModel.create({userId:req.body.userId,productId:req.body.productId});
          res.status(201).json({
            data : cartItems,
            status:true
          });
      }
    } catch (error) {
      res.status(404).json({
        message: error.message,
        status:false
      });
    }
  }


// ### GET ITEM FROM CART 
const getItem = async (req, res) => {
    try {
      const cartItems = await cartModel
        .find({ userId: req.body.userId })
        .populate("productId");
      if (cartItems.length >= 1) {
        let total = 0;
        for (var i = 0; i < cartItems.length; i++) {
          total += cartItems[i].productId.price * cartItems[i].quantity;
        }
        res.status(200).json({
          data: cartItems,
          totalPayment: total,
          status:true
        });
      } else {
        res.status(404).json({
          cartItems: "No CartItems Found from this userID",
          status:false
        });
      }
    } catch (error) {
      res.status(404).json({
        error: error.message,
        status:false
      });
    }
  }



// ### UPDATE ITEM Quantity IN CART 
const updateQ = async(req,res)=>{
    try {
      const allCartItems = await cartModel.find({
        userId: req.body.userId,
        productId: req.body.productId,
      });
      if (allCartItems.length >= 1) {
        const UpdatedCart = await cartModel.findByIdAndUpdate(
          allCartItems[0]._id,
          { quantity: allCartItems[0].quantity - 1 }
        );
        res.status(200).json({
          status:true,
          newItem_added: UpdatedCart
        });
      } else {
        res.status(404).json({
         status:false,
          message: "This product not exists"
        })
      }
    } catch (error) {
      res.status(404).json({
        message: error.message,
        status:false,

      });
    }
  }


// ### DELETE ITEM FROM CART 
const delItem = async (req, res) => {
    try {
      const id = req.params.id;
      const cartItems = await cartModel.findByIdAndDelete(id);
      if (cartItems) {
        res.status(200).json({
          message: "Cart Item Deleted SuccessFully",
          status:true
        });
      } else {
        res.status(404).json({
          message: "ID Not Found",
          status:false
        });
      }
    } catch (error) {
      res.status(404).json({
        error: "ID Not Found",
        status:false
      });
    }
  }


  module.exports = {delItem , getItem , postItem , updateQ}