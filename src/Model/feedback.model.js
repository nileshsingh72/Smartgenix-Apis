const { model, Schema } = require("mongoose");
const feedbackSchema = new Schema(
  {
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comments:{
        type :  String,
    },
    productId : {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const feedbackModel = model("feedback", feedbackSchema);
module.exports = feedbackModel;
