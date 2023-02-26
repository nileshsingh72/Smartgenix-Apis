const express = require("express");
const { getOrder, deleteOrder, shippingSuccess, getOrderDataForUser, packingSuccess, deliverSuccess, getSingleOrder, createOrder } = require("../Controller/order.controller");
const { adminAuth } = require("../Middlewares/admin.middleware");
const { userAuth } = require("../Middlewares/user.middleware");
const orderRoute = express.Router();


orderRoute.get('/',adminAuth,getOrder)
orderRoute.delete('/cancel/:id',userAuth,deleteOrder)
orderRoute.patch('/shipped/:id',adminAuth , shippingSuccess)
orderRoute.get('/user/get',userAuth , getOrderDataForUser)
orderRoute.patch('/packed/:id',adminAuth , packingSuccess)
orderRoute.patch('/delivered/:id',adminAuth,deliverSuccess)
orderRoute.get('/:id' ,userAuth , getSingleOrder )
orderRoute.post('/create',userAuth , createOrder)


module.exports = { orderRoute };
