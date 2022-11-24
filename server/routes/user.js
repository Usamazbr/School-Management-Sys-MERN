const express = require("express");
const router = express.Router();

// controller functions
const {
  getAllData,
  signupUser,
  loginUser,
  chanPass,
  // getAllNots,
  // delNots,
  // setHier,
  // getJuniors,
  // getSeniors,
} = require("../controllers/userController");
const userFilter = require("../middleware/userFilter");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// check data
router.route("/data").get(getAllData);
// router.route("/data/juniors/:User").get(getJuniors);
// router.route("/data/seniors/:User").get(getSeniors);

// get notificions
// router.route("/Nots/:User").get(getAllNots).delete(delNots);

//ID requests
// router.route("/:User");
// router.route("/hier/:User").patch(setHier);

//middleware
router.use(userFilter);

// change password
router.route("/change").patch(chanPass);

module.exports = router;
