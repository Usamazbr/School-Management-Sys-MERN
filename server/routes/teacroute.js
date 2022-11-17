const express = require("express");
const {
  getAlldata,
  createData,
  patchData,
  deleteData,
} = require("../controllers/teacControl");

const router = express.Router();

// all data and add data
router.route("/data").get(getAlldata).post(createData);

// edit and delete data
router.route("/:Teac").patch(patchData).delete(deleteData);

module.exports = router;
