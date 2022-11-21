const Teacher = require("../models/teacModel");
const { signupUser } = require("./userController");
// const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");

//get all data
const getAlldata = async (req, res) => {
  const user_id = req.user._id;

  try {
    const data = await Teacher.find({ user_id }).sort({ updatedAt: 1 });
    res.status(200).send({ data });
  } catch (err) {
    res.status(404).json({ err: err });
  }
};

// password generation and assignment
const generatePassword = async () => {
  let length = 10,
    charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  retVal = retVal + Math.trunc(Math.random() * 1000);
  // console.log("password => " + retVal);
  // console.log("from: " + ea);
  // console.log("to: " + e);

  // const email1 = "usamaengine@gmail.com";
  //   const email2 = "umairkhanu07@gmail.com";

  //hash
  const enrate = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(retVal, enrate);
  const pass = { retVal, hash };

  return pass;
};

const generateEmail = async (e, ea, pass) => {
  // sending Password
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 2525,
    auth: {
      user: ea,
      pass: "sdhepoviekctlvos",
    },
  });

  const message = {
    from: ea, // Sender address
    to: e, // List of recipients
    subject: "Your credentials for School Managment", // Subject line
    html: `<h2>Email: ${e}<br/>Password: ${pass}</h2><br/><br/><p>Please don't share this with anyone</p>`, // Plain text body
  };
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
};

//create data
const createData = async (req, res) => {
  const { user, username, subjects, email, period } = req.body;
  const user_id = req.user._id;
  const admin = 2;
  console.log("\x1b[33mteacControl line 77: \x1b[0m");
  console.log(req.body);
  if (!username) {
    throw Error("Username is required");
  }
  if (!email) {
    throw Error("Email is required");
  }
  const password = await generatePassword();
  console.log("\x1b[33mteacControl line 85: \x1b[0m");
  console.log(password);

  const a = { body: { email, password: password.hash, admin } };

  // const already = await Teacher.findOne({ email, admin });
  // if (already) {
  //   throw Error("Email is already in use");
  // }
  try {
    const re = await signupUser(a);
    await generateEmail(email, user.email, password.retVal);
    console.log("\x1b[33mteacControl line 99:\x1b[0m ");
    console.log("return is " + re);
    const data = await Teacher.create({
      username,
      password: password.hash,
      subjects,
      email,
      period,
      user_id,
    });
    console.log("\x1b[33mteacControl line 109:\x1b[0m ");
    console.log(data);
    // data.save();
    res.status(200).send({ data });
  } catch (err) {
    console.log("Error 2: " + err);
    res.status(400).json({ err: err.message });
  }
};

//edit data
const patchData = async (req, res) => {
  const { username, subjects, email, period } = req.body;
  const teac_id = req.params.Teac;
  console.log(teac_id);
  // console.log(req.body);
  try {
    const data = await Teacher.findByIdAndUpdate(
      teac_id,
      {
        username,
        subjects,
        email,
        period,
      },
      { new: true }
    );
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//delete data
const deleteData = async (req, res) => {
  const teac_id = req.params.Teac;
  try {
    const data = await Teacher.findByIdAndDelete({ _id: teac_id });
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { getAlldata, createData, patchData, deleteData };
