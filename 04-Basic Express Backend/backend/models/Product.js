const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    productname: String,
    price: Number,
    description: String,
    category: String,
    stock:Number,
    image: {type: mongoose.Types.ObjectId,ref:"image"}
  });
  
  const product = mongoose.model("product", schema);

  module.exports = product;