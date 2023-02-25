const mongoose = require("mongoose");

let orderItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    orderData : {
        type : Array
    },
    totalBill : {
        type: Number
    },
    paymentMethod : {
    type : String,
   }, 
    packed : {
        type: Boolean,
        default: false
    } , shipped : {
        type: Boolean,
        default: false
    } , delivered : {
        type: Boolean,
        default: false
    } , 
        deliveredAddress : {
        type: Object,
    } 
},{
    versionKey:false,
    timestamps:true
});
const orderModel = mongoose.model("order", orderItemSchema);
module.exports = orderModel;