const orderedModel = require("../model/orderModel");
const { orderMail } = require("../config/emailAPIsetUp");
const otpGenerator = require("otp-generator");

const createOrder = async (req, res) => {
  try {
    const { email, orderDetail } = req.body;

    const otp = otpGenerator.generate(10, {
      specialChars: false,
      upperCaseAlphabets: false,
      digits: true,
      lowerCaseAlphabets: false,
    });

    const newShip = await orderedModel.create({
      email,
      orderOTP: otp,
      orderDetail,
    });
    orderMail(email, otp)
      .then((result) => {
        console.log("Sent", result);
      })
      .catch((error) => console.log(error));
    res.status(201).json({
      message: "Order Created",
      data: newShip,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occoured",
      data: error.message,
    });
  }
};

const getOrdered = async (req, res) => {
  try {
    const getShip = await orderedModel.find();
    res.status(200).json({
      message: "Data Goten",
      data: getShip,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occoured",
      data: error.message,
    });
  }
};

const updateDelivery = async (req, res) => {
  try {
    const updateOrder = await orderedModel.findByIdAndUpdate(
      req.params.id,
      { delivered: true },
      { new: true }
    );

    res.status(200).json({
      message: "Upadated",
      data: updateOrder,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occoured",
      data: error.message,
    });
  }
};

module.exports = { createOrder, getOrdered, updateDelivery };
