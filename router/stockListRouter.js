const express = require("express");
const router = express.Router();
const {
  getAllStocklist,
  createStore,
  updateStocklist,
  deleteStocklist,
  getAStore,
} = require("../controller/stocklistController");

router.route("/").get(getAllStocklist);
router.route("/:id").get(getAStore);
router.route("/update/:id").patch(updateStocklist);
router.route("/remove/:id").delete(deleteStocklist);
router.route("/newstore").post(createStore);

module.exports = router;
