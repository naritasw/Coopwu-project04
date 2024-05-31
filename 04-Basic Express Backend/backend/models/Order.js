const mongoose = require('mongoose');

const Order = new mongoose.Schema(
  {
    date: Date,
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      },
    ],
    customer_name: String,
    address: String,
    tel: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', Order);
