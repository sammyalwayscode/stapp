const mongoose = require("mongoose");
// const MONGOATLAS_URI =
//   "mongodb+srv://W8PypVqIRJXDReMh:W8PypVqIRJXDReMh@cluster0.1nq2x.mongodb.net/sktriumph?retryWrites=true&w=majority";
const MONGOCOMPASS_URI = "mongodb://localhost/skintriumph";
const MAIN_ATLAS =
  "mongodb+srv://skincare:34i6qf4UmaXSqGp1@cluster0.inpigko.mongodb.net/skintriumph?retryWrites=true&w=majority";

mongoose.connect(MONGOCOMPASS_URI);
mongoose.connection
  .on("open", () => {
    console.log("Connected to DB🏬");
  })
  .once("error", () => {
    console.log("Failed to Connect to DB ❌❌❌");
  });

module.exports = mongoose;
