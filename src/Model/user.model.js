const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "user" },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const userModel = model("user", userSchema);
module.exports = userModel;
