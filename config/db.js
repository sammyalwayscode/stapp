const mongoose = require("mongoose");
require("dotenv").config();
// const MONGOCOMPASS_URI = "mongodb://localhost/skintriumph";
const MAIN_ATLAS = process.env.MAIN_ATLAS_URI;

mongoose.connect(MAIN_ATLAS);
mongoose.connection
  .on("open", () => {
    console.log("Connected to DBð¬");
  })
  .once("error", () => {
    console.log("Failed to Connect to DB âââ");
  });

module.exports = mongoose;
