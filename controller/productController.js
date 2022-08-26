const productModel = require("../model/productModel");
const cloudinary = require("../config/cloudinary");

const getAllProducts = async (req, res) => {
  try {
    const productGet = await productModel.find();
    res.status(200).json({
      message: "All Products",
      data: productGet,
    });
  } catch (error) {
    res.status(404).json({
      message: "Couldn't Get Data",
      data: error.message,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const singleGet = await productModel.findById(req.params.id);
    res.status(200).json({
      message: "Product Goten",
      data: singleGet,
    });
  } catch (error) {
    res.status(404).json({
      message: "Couldn't Get Data",
      data: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productDescription2,
      productDescription3,
      shortDescription,
      price,
      category,
    } = req.body;
    const cloudImage = await cloudinary.uploader.upload(req.file.path);
    const productUpload = await productModel.create({
      productName,
      productDescription,
      productDescription2,
      productDescription3,
      shortDescription,
      price,
      category,
      avatar: cloudImage.secure_url,
      avatarID: cloudImage.public_id,
    });

    res.status(200).json({
      message: "Product Uploaded Sucessfully",
      data: productUpload,
    });
  } catch (error) {
    res.status(404).json({
      message: "Couldn't Create Product",
      data: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const check = await productModel.findById(req.params.id);
    if (check) {
      const {
        productName,
        productDescription,
        productDescription2,
        productDescription3,
        shortDescription,
        price,
        category,
      } = req.body;
      cloudinary.uploader.destroy(check.avatarID);
      const cloudImage = await cloudinary.uploader.upload(req.file.path);

      const newContent = await productModel.findByIdAndUpdate(
        req.params.id,
        {
          productName,
          productDescription,
          productDescription2,
          productDescription3,
          shortDescription,
          price,
          category,
          avatar: cloudImage.secure_url,
          avatarID: cloudImage.public_id,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Edited",
        data: newContent,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const removeProduct = await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Deleted Sucessfully",
      data: removeProduct,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occoured",
      data: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
