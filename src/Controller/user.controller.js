require("dotenv").config();
var key = process.env.Key;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Model/user.model");

const userRegister = async (req, res) => {
  const { email, password } = req.body;
  const { token } = req.headers;
  const isPresent = await userModel.findOne({ email: email });
  if (isPresent) {
    res.json({ status: false, message: "User already registered!" });
  } else {
    try {
      bcrypt.hash(password, 8, async function (err, hash) {
        if (err) {
          console.log(err);
          res.json({ status: false, message: err.message });
        } else {
          if (token) {
            let decoded = jwt.decode(token);
            if (decoded.role === "admin") {
              const newUser = new userModel({
                ...req.body,
                role: "admin",
                password: hash,
              });
              await newUser.save();
              res.json({
                status: true,
                message: "Admin successfully registered!",
              });
            } else {
              res.json({
                status: false,
                message: "You can not create admin !",
              });
            }
          } else {
            const newUser = new userModel({
              ...req.body,
              password: hash,
            });
            await newUser.save();
            res.json({
              status: true,
              message: "User successfully registered!",
            });
          }
        }
      });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
};

const userSignin = async (req, res) => {
  const { email, password } = req.body;

  const isExist = await userModel.findOne({ email });
  if (!isExist) {
    res.json({ status: false, message: "No user with that email" });
  } else {
    let hashpassword = isExist.password;
    try {
      bcrypt.compare(password, hashpassword, async (err, result) => {
        if (err) {
          res.json({ status: false, message: err.message });
        } else {
          if (!result) {
            res.json({ status: false, message: "wrong password" });
          } else {
            var token = jwt.sign(
              {
                userId: isExist._id,
                role: isExist.role,
                email: isExist.email,
              },
              key,
              { expiresIn: "6h" }
            );
            res.json({
              status: true,
              message: "Login successful",
              token: token,
              user: isExist,
            });
          }
        }
      });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
};

const delUser = async(req , res)=>{
   const {id} = req.params;

   try{
     let user = await userModel.findByIdAndDelete(id);
     res.send({
      status:true,
      message:'User deleted sucessfully'
     })
   }
   catch(e){
    res.send({
      status:false,
      message:e.message
    })
   }
}

module.exports = { userRegister, userSignin , delUser };
