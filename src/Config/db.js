require("dotenv").config();
const { connect } = require("mongoose");
const connectDB = () => connect(process.env.URL);
module.exports = connectDB;
