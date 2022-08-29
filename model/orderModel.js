const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    orderOTP: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    totalQantity: {
      type: Number,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    orderDetail: {
      type: Array,
    },
  },
  { timestamps: true }
);

const orderedModel = mongoose.model("orderedUsers", orderSchema);
module.exports = orderedModel;
