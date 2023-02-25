const transporter = require("../Config/mail");
const cartModel = require("../model/cart.model");
const orderModel = require("../Model/order.model");
const productModel = require("../Model/product.model");
 
//for admin use
const getOrder = async()=>{
    try{
        let data = await  orderModel.find()

        if(data.length == 0){
            return {
                status:false,
                massage : 'you dont have any order'
            }
        }
        else{
            return {
                status:true,
                massage : 'order data fetched successfully',
                data
            }
        }
    }
    catch(e){
        return {
            status:false,
            massage : e.message
        }
    }
}
//for admin use

const getSingleOrder = async(id)=>{
    try{
        let data = await  orderModel.find({_id:id})

        if(data.length == 0){
            return {
                status:false,
                massage : 'you dont have any order'
            }
        }
        else{
            return {
                status:true,
                massage : 'single order data fetched successfully',
                data
            }
        }
    }
    catch(e){
        return {
            status:false,
            massage : e.message
        }
    }
}


//for user use
const deleteOrder = async(id)=>{
    try{

        let deleted = await orderModel.deleteOne({_id:id});

        if(deleted.acknowledged){
            return {
                status:true,
                massage : 'order daleted successfully',
            }
        }
        else{
            return {
                status:false,
                massage : 'something went wrong please try again later !'
            }
        }
    }
    catch(e){
        return {
            status:false,
            massage : e.message
        }   
     }


}

//for admin use
const packingSuccess = async(id)=>{
    try{

        let findData = await orderModel.find({_id:id})
        if(findData.length > 0){

            let updatedData = await orderModel.findByIdAndUpdate(findData[0]._id,{ 'packed': !findData[0].packed }) 
            if(updatedData.userId){
                return {
                    status:true,
                    massage : 'order packed changed successfully',
                }
            }
            else{
                return {
                    status:false,
                    massage : 'something went wrong please try again later !'
                }
            }
        }
        else{
            return {
                status:false,
                massage : 'something went wrong please try again later !'
            }
        }

    }
    catch(e){
        return {
            status:false,
            massage : e.message
        }   
     }
}
//for admin use

const shippingSuccess = async(id)=>{
    try{

        let findData = await orderModel.find({_id:id})
        if(findData.length > 0){

            let updatedData = await orderModel.findByIdAndUpdate(findData[0]._id,{ 'shipped': !findData[0].shipped }) 
                 console.log(updatedData)
            if(updatedData.userId){
                return {
                    status:true,
                    massage : 'order shipped changed successfully',
                }
            }
            else{
                return {
                    status:false,
                    massage : 'something went wrong please try again later !'
                }
            }
        }
        else{
            return {
                status:false,
                massage : 'something went wrong please try again later !'
            }
        }

    }
    catch(e){
        return {
            status:false,
            massage : e.message
        }   
     }
}

//for admin use

const deliverSuccess = async(id)=>{
    try{
        let findData = await orderModel.find({_id:id})
        if(findData.length > 0){

            let updatedData = await orderModel.findByIdAndUpdate(findData[0]._id,{ 'delivered': !findData[0].delivered }) 
            if(updatedData.userId){
                return {
                    status:true,
                    massage : 'order delivered changed successfully',
                }
            }
            else{
                return {
                    status:false,
                    massage : 'something went wrong please try again later !'
                }
            }
        }
        else{
            return {
                status:false,
                massage : 'something went wrong please try again later !'
            }
        }

    }
    catch(e){
        return {
            status:false,
            massage : e.message
        }   
     }
}

//for user use
const createOrder = async(userId,totalBill,details,paymentType)=>{
    try{
    let findData = await cartModel.find({userId:userId},{_id : 0 , __v : 0}).populate( 'productId' )
        if(findData.length > 0){
              let total = 0;
    for (var i = 0; i < orderData.length; i++) {
      total += orderData[i].productId.price * orderData[i].quantity;
    }
  let orderDatalist= await orderModel.create({userId : req.body.userId, orderData : orderData , totalBill: total , deliveredAddress : req.body.address}); 
            if(!orderDatalist.userId){
                return {
                    status:false,
                    massage : 'something went wrong please try again later !'
                }
            }
            else{
                findData.forEach(async(ele)=>{
                       await  productModel.findByIdAndUpdate(
                           ele.productId._id,
                        { quantity: ele.productId.quantity - ele.quantity }
                      )
                   })
                await cartModel.deleteMany({userId:userId})
                transporter.sendMail({
                    to:req.body.address.email,
                    from:'smartgenix7@gmail.com',
                    subject:'Order Successfully Added',
                    html : `<h4>Hello ${req.body.address.name}</h4><br /><br /><p>Your order from Smart Genix has been submited successfull</p><br /><br />
                            <p>Total bill : ${total}</p> <br />
                            <p>OrderId : ${orderDatalist._id} </p><br /><br />
                            <p>Thanks for choosing us ! </p>
                             `
                })
                return {
                    status:true,
                    massage : 'order submitted successfully',
                }
            }
        }
        else{
            return {
                status:false,
                massage : 'something went wrong please try again later !'
            }
        }

    }
    catch(e){
        return {
            status:false,
            massage : e.message
        }   
     }

}


const getOrderDataForUser = async(userId)=>{
    try{
        let data = await  orderModel.find({userId})
        if(data.length==0){
            return {
                status:false,
                massage : 'you dont have any order'
            }
        }
        else{
            return {
                status:true,
                massage : 'single order data fetched successfully',
                data
            }
        }
    }
    catch(e){
        return {
            status:false,
            massage : e.message
        }
    }
}

module.exports = {getOrder,deleteOrder,packingSuccess,shippingSuccess,deliverSuccess , createOrder , getSingleOrder , getOrderDataForUser}