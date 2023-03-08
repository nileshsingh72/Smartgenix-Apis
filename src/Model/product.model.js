const { model, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    img: { type: String },
    name: { type: String },
    price: { type: Number },
    category: { type: String },
    brand: { type: String },
    feat: { type: String },
    feat2: { type: String },
    feat3: { type: String },
    feat4: { type: String },
    feat5: { type: String },
    feat6: { type: String },
    feat7: { type: String },
    feat8: { type: String },
    score: { type: Number },
    img2: { type: String },
    tag: { type: String },
    rating: { type: Number },
    quantity: { type: Number },
    src2: { type: String },
    tag: { type: String },
    pdrop: { type: String },
    src: { type: String },
    offPrice: { type: String },
    discount: { type: String },
    badgeText: { type: String },
    title: { type: String },
    _id : {type :String}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const productModel = model("product", productSchema);
module.exports = productModel;
