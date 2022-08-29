const stocklistModel = require("../model/stockListModel");

const getAllStocklist = async (req, res) => {
  try {
    const getStore = await stocklistModel.find();
    res.status(200).json({
      message: "Data Gotten Sucessfully",
      data: getStore,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occoured",
      data: error.message,
    });
  }
};

const getAStore = async (req, res) => {
  try {
    const oneStore = await stocklistModel.findById(req.params.id);
    res.status(200).json({
      message: "Data Gotten Sucessfully",
      data: oneStore,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occoured",
      data: error.message,
    });
  }
};

const createStore = async (req, res) => {
  try {
    const { office, phoneNo, address, email, hours } = req.body;
    const newStore = await stocklistModel.create({
      office,
      phoneNo,
      address,
      email,
      hours,
    });
    res.status(201).json({
      message: "Uploaded Sucessfully",
      data: newStore,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occoured",
      data: error.message,
    });
  }
};

const updateStocklist = async (req, res) => {
  try {
    const { office, phoneNo, address, email, hours } = req.body;
    const update = await stocklistModel.findByIdAndUpdate(
      req.params.id,
      {
        office,
        phoneNo,
        address,
        email,
        hours,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Updated",
      data: update,
    });
  } catch (error) {
    res.status(404).json({
      mesage: "An Error Occoured",
      data: error.message,
    });
  }
};

const deleteStocklist = async (req, res) => {
  try {
    const deleteStock = await stocklistModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Deleted",
      data: deleteStock,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occured",
      data: error.message,
    });
  }
};

module.exports = {
  getAStore,
  getAllStocklist,
  createStore,
  updateStocklist,
  deleteStocklist,
};
