const express = require("express");
const {
  getAlldata,
  createData,
  patchData,
  deleteData,
  patchRes,
  getOne,
  createMsg,
  fetchMsg,
  leaveReq,
} = require("../controllers/stuControl");
const stuFilter = require("../middleware/stuFilter");

const router = express.Router();

//middleware
router.use(stuFilter);

// all data and add data
router.route("/data").get(getAlldata).post(createData);
router.route("/data1").get(getOne);
router.route("/data/:Stu").get(getAlldata);

// messages
router.route("/msg").post(createMsg);
router.route("/msg/:Stu").get(fetchMsg);

// leave request
router.route("/leave").post(leaveReq);

// patch result
router.route("/result/:Stu").patch(patchRes);

// edit and delete data
router.route("/:Stu").patch(patchData).delete(deleteData);

module.exports = router;
