const productModel = require("../Model/product.model");

const getItem = async(req, res) => {
    // filters
    let { category, brand, min, max, sort, order } = req.query;
    min = Number(min);
    max = Number(max);
    order = order === "asc" ? 1 : -1;
    try {
      let data = await productModel.find();
      if (category) {
        data = await productModel.aggregate([{$match: { category } }]);
        if (brand) {
        data = await productModel.aggregate([{$match: { category } } , {$match : {brand : brand}}]);
          if (min) {
              data = await productModel.aggregate([{$match: { category } } , {$match : {brand : brand}} , {$match : {price :{$gte : min}}}]);
            if(sort){
                data = await productModel.aggregate([{$match : {category : category}} ,
                    {$match : {brand : brand}} ,
                    {$match : {price : {$gte:min}}},
                    {$sort : sort === 'price' ? {price :order }:{rating : order}}
                   ])
            }
            if(max){
            data = await productModel.aggregate([{$match : {category : category}} ,
                                                 {$match : {brand : brand}} ,
                                                 {$match : {price : {$gte:min}}},
                                                 {$match : {price : {$lte:max}}}
                                                ])
             if(sort){
                data = await productModel.aggregate([{$match : {category : category}} ,
                    {$match : {brand : brand}} ,
                    {$match : {price : {$gte:min}}},
                    {$match : {price : {$lte:max}}},
                    {$sort : sort === 'price' ? {price :order }:{rating : order}}
                   ])
            }
            }
          }
          if(max && !min){
            data = await productModel.aggregate([{$match: { category } } , {$match : {brand : brand}} , {$match : {price :{$lte : max}}}]);
               if(sort){
                data = await productModel.aggregate([{$match : {category : category}} ,
                    {$match : {brand : brand}} ,
                    {$match : {price : {$lte:max}}},
                    {$sort : sort === 'price' ? {price :order }:{rating : order}}
                   ])
            }
          }
          if(sort && !min && !max ){

            data = await productModel.aggregate([{$match : {category : category}} ,
                {$match : {brand : brand}} ,
                {$sort : sort === 'price' ? {price :order }:{rating : order}}
               ])
          }
        }
        else{
              if (min) {
                  data = await productModel.aggregate([{$match: { category } }, {$match : {price :{$gte : min}}}]);
                if(sort){
                    data = await productModel.aggregate([{$match : {category : category}} ,
                        {$match : {price : {$gte:min}}},
                        {$sort : sort === 'price' ? {price :order }:{rating : order}}
                       ])
                }
                if(max){
                data = await productModel.aggregate([{$match : {category : category}} ,
                                                     {$match : {price : {$gte:min}}},
                                                     {$match : {price : {$lte:max}}}
                                                    ])
                 if(sort){
                    data = await productModel.aggregate([{$match : {category : category}} ,
                        {$match : {price : {$gte:min}}},
                        {$match : {price : {$lte:max}}},
                        {$sort : sort === 'price' ? {price :order }:{rating : order}}
                       ])
                }
                }
              }
              if(max && !min){
                data = await productModel.aggregate([{$match: { category } } , {$match : {price :{$lte : max}}}]);
                   if(sort){
                    data = await productModel.aggregate([{$match : {category : category}} ,
                        {$match : {price : {$lte:max}}},
                        {$sort : sort === 'price' ? {price :order }:{rating : order}}
                       ])
                }
              }
              if(sort && !min && !max ){
    
                data = await productModel.aggregate([{$match : {category : category}} ,
                    {$sort : sort === 'price' ? {price :order }:{rating : order}}
                   ])
              }
            }
        }     
      res.json({ status : true, data});
    } catch (error) {
      res.json({status : false  , message : error.message});
    }
  }
  

  const createItem = async(req , res)=>{
    const data = req.body;
    try{
      let ans = await productModel.create(data);
      res.send({
        status:true , 
        message:'Item created Successfully'
      })
    }
    catch(e){
      res.send({
        status:false , 
        message:e.message
      })
    }
  }

  const createManyItems = async(req , res)=>{
    const data = req.body;
    try{
      let ans = await productModel.insertMany(data);
      res.send({
        status:true , 
        message:'Item inserted Successfully'
      })
    }
    catch(e){
      res.send({
        status:false , 
        message:e.message
      })
    }
  }


  const delProduct = async(req , res)=>{
    const {id} = req.params;
    try{
      let user = await userModel.findByIdAndDelete(id);
      res.send({
       status:true,
       message:'Product deleted sucessfully'
      })
    }
    catch(e){
     res.send({
       status:false,
       message:e.message
     })
    }
 }

 const updatePQ = async(req,res)=>{
  const {id} = req.params;
  const {newQuantity} = req.body;
  try {
    const Items = await productModel.find({
       _id : id
    });
    if (Items.length >= 1) {
      const UpdatedItem = await productModel.findByIdAndUpdate(
        Items[0]._id,
        { quantity: Items[0].quantity + newQuantity }
      );
      res.status(200).json({
        status:true,
        data: UpdatedItem
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


const updateProduct = async(req, res)=>{
  const {id} = req.params;
  const newObj = req.body;
  try{
    let find = await productModel.find({_id : id});
    if(find.length >=1){
        let obj = {};
        for(let key in newObj){
          if(key !=='_id' && key !=="id"){
              obj[key] = newObj[key]
          }
        }
        let upDatedData = await productModel.replaceOne({_id : id}, {...obj});
        res.send({
           staus:true,
           message:'Product updated successfully'
        })
    }
    else{
      res.send({
        status:false,
        message:'Item not found with this ProductId'
      })
    }
  }
  catch(e){
    res.send({
      status:false,
      message: e.message
    })
  }
}

const singleProd = async(req, res)=>{
  const {id} = req.params;
  try{
    let find = await productModel.find({_id : id});
    if(find.length >=1){
        res.send({
           staus:true,
           message:'Product finded successfully',
           data:find[0]
        })
    }
    else{
      res.send({
        status:false,
        message:'Item not found with this ProductId'
      })
    }
  }
  catch(e){
    res.send({
      status:false,
      message: e.message
    })
  }
}

  module.exports = {getItem , createItem , createManyItems , delProduct , updatePQ , updateProduct , singleProd}
  