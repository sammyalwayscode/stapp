const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const { blogUpload } = require("../config/multer");

router.route("/").get(getBlogs);
router.route("/:id").get(getBlog);
router.route("/create").post(blogUpload, createBlog);
router.route("/update/:id").patch(blogUpload, updateBlog);
router.route("/delete/:id").delete(deleteBlog);

module.exports = router;
