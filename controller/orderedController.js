const orderedModel = require("../model/orderModel");
const { orderMail } = require("../config/emailAPIsetUp");
const otpGenerator = require("otp-generator");

const createOrder = async (req, res) => {
  try {
    const { email, orderDetail, totalQantity, totalPrice } = req.body;

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
      totalQantity,
      totalPrice,
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

const getOneOrder = async (req, res) => {
  try {
    const oneOrder = await orderedModel.findById(req.params.id);
    res.status(200).json({
      message: "Data Gotten",
      data: oneOrder,
    });
  } catch (error) {
    res.status(404).json({
      message: "Couldn't Get Data",
      data: error.message,
    });
  }
};

const paginateOrder = async (req, res) => {
  try {
    const { pages, limit } = req.query;

    const queryItems = await orderedModel
      .find()
      .limit(limit)
      .skip((pages - 1) * limit);

    res.status(201).json({
      total: queryItems.length,
      message: "Item Gotten",
      data: queryItems,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occored",
      data: error.message,
    });
  }
};

const searchOrder = async (req, res) => {
  try {
    const makeSearch = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const allOrders = await orderedModel.find(makeSearch);

    res.status(201).json({
      message: "Order seen",
      data: allOrders,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occured",
      data: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrdered,
  updateDelivery,
  getOneOrder,
  paginateOrder,
  searchOrder,
};
