const productModel = require("./src/Model/product.model")
const watches = require("./watches.json")
// const fs = require("fs")
// for(let el of watches){
//  let str = "";
//  for(let i = 0; i < el.price.length; i++){
//     if(el.price[i] !== "₹"  &&   el.price[i] !== "," &&   el.price[i] !== " "){
//         str += el.price[i]
//     }
//  }
//  el.price = Number(str)

// }

// fs.writeFileSync("./watches.json", JSON.stringify(watches));

// async function bhejo (){
//      await productModel.insertMany(watches);

// }
// bhejo()