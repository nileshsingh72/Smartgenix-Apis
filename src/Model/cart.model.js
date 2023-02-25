const mongoose = require("mongoose");

let cartItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity : {type:Number,default:1}
},{
    versionKey:false,
    timestamps:true
});
const cartModel = mongoose.model("cart", cartItemSchema);
module.exports = cartModel;