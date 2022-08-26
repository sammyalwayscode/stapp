const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrdered,
  updateDelivery,
} = require("../controller/orderedController");

router.route("/").get(getOrdered);
router.route("/newshipping/order").post(createOrder);
router.route("/delivered/:id").patch(updateDelivery);

module.exports = router;
