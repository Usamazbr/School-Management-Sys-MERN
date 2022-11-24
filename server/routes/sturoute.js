const express = require("express");
const {
  getAlldata,
  createData,
  patchData,
  deleteData,
} = require("../controllers/stuControl");
const stuFilter = require("../middleware/stuFilter");

const router = express.Router();

//middleware
router.use(stuFilter);

// all data and add data
router.route("/data").get(getAlldata).post(createData);
router.route("/data/:Stu").get(getAlldata);

// edit and delete data
router.route("/:Stu").patch(patchData).delete(deleteData);

module.exports = router;
