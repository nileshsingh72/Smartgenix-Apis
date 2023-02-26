const { response } = require("express")
const feedbackModel = require("../Model/feedback.model")

const getfb  = async(req , res) => {

  try {
    let fbs  = await feedbackModel.find().populate("userId")
    res.json({status : true  , data : fbs})
  } catch (error) {
    res.json({status : false  , message : error.message})
  }
   
}
//for single product 
const getSinglefb  = async(req , res) => {
  try {
    let fbs  = await feedbackModel.find({productId: req.params.id}).populate("userId")
    res.json({status : true  , data : fbs})
  } catch (error) {
    res.json({status : false  , message : error.message})
  }
   
}

const postfb = async(req , res ) => {
try {
   await feedbackModel.create({...req.body})
  res.json({status : true  , message : "Thanks for your comments !"})
} catch (error) {
    res.json({status : false  , message : error.message})
}
}

// for admin only

const delfb = async (req, res) => {
try {
   let del = await feedbackModel.findByIdAndDelete(req.params.id)
  res.json({status : true  , message : "Post Deleted Successfully !"})
} catch (error) {
    res.json({status : false  , message : error.message})
}
}

module.exports = { getfb , postfb , delfb , getSinglefb}