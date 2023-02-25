const express = require("express");
const productModel = require("../Model/product.model");
const productRoute = express.Router();
const mo = require("../../mobiles.json")
const watcher = require("../../watches.json")
const lap = require("../../lap.json")
productRoute.get("/", async (req, res) => {
  // filters
  let { category, brand, min, max, sort, order } = req.query;
  min = Number(min);
  max = Number(max);
  order = order === "asc" ? 1 : -1;
  try {
    let data = await productModel.find();
    if (category) {
      data = await productModel.find({ category });
      if (brand) {
        data = await productModel.find({ category, brand });
        if (min) {
          data = await productModel.find({category,  brand,  price: { $gte: min } });
          if(sort){
            data = await productModel.find({category,  brand,  price:   {$gte: min } } ).sort(sort === 'price' ? {price :order }:{rating : order} );
          }
          if(max){
          data = await productModel.find({category,  brand,  price: {  $and : [{$gte: min } , { $lte : max} ] } });
           if(sort){
          data = await productModel.find({category,  brand,  price: {  $and : [{$gte: min } , { $lte : max} ] } })
          .sort(sort === 'price' ? {price :order }:{rating : order} );
          }
          }
        }
        if(max){
          data = await productModel.find({category,  brand,  price: { $lte: max } });
             if(sort){
       data = await productModel.find({category,  brand,  price: { $lte: max } })
          .sort(sort === 'price' ? {price :order }:{rating : order} );
          }
        }
        if(sort ){
        data = await productModel.find({ category, brand })
          .sort(sort === 'price' ? {price :order }:{rating : order} );

        }
      }
    }
    res.json({ status : true, data});
  } catch (error) {
    res.json({status : false  , message : error.message});
  }
});


productRoute.post("/" , async(req , res) => {
  
  try {
    
    let ans  = await productModel.insertMany(lap)
    // let ans1  = await productModel.insertMany(watcher)
    // let ans2  = await productModel.insertMany(mo)
    res.json({ status : true})
  } catch (error) {
    res.json({status : false , message : error.message});
  }
})





module.exports = { productRoute };
