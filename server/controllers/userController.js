const User = require("../models/userModel");
const Notify = require("../models/notifyModel");
const jwt = require("jsonwebtoken");

// create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // creating token
    const token = createToken(user._id);

    const admin = user.admin;
    res.status(200).json({ email, token, admin });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

// check all data temporirily
const getAllData = async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, admin } = req.body;
  console.log("\x1b[33mteacControl line 40:\x1b[0m ");
  console.log(admin);

  try {
    // let user;
    if (!admin) {
      let a = 1;
      const user = await User.signup(email, password, a);
      // creating token
      const token = createToken(user._id);

      res.status(200).json({ email, token, a });
    } else {
      const user = await User.signup(email, password, admin);
      // creating token
      const token = createToken(user._id);

      // res.status(200).json({ email, token, admin });
    }

    // fetching and notifying all admins
    // const admindata = await User.find({ admin }).select("_id");
    // creating notifications
    // for (let id of admindata) {
    //   const notreq = await Notify({
    //     admin_id: id._id,
    //     req_id: user._id,
    //     authapp: "Please approve: " + email,
    //   });
    //   notreq.save();
    // }
  } catch (err) {
    console.error("Error 1: " + err);
    res.status(400).json({ err: err.message });
  }

  // res.json({ msg: "signup user" });
};

module.exports = {
  getAllData,
  signupUser,
  loginUser,
};
