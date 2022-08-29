const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrdered,
  updateDelivery,
  getOneOrder,
  searchOrder,
  paginateOrder,
} = require("../controller/orderedController");

router.route("/").get(getOrdered);
router.route("/:id").get(getOneOrder);
router.route("/newshipping/order").post(createOrder);
router.route("/delivered/:id").patch(updateDelivery);
router.route("/search").get(searchOrder);
router.route("/paginate").get(paginateOrder);

module.exports = router;
