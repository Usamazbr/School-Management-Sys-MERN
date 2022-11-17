const Teacher = require("../models/teacModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//get all data
const getAlldata = async (req, res) => {
  try {
    const data = await Teacher.find({});
    res.status(200).send({ data });
  } catch (err) {
    res.status(404).json({ err: err });
  }
};

// password generation and assignment
const generatePassword = async (e) => {
  let length = 10,
    charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  retVal = retVal + Math.trunc(Math.random() * 1000);
  //   console.log(typeof retVal);

  const email1 = "usamaengine@gmail.com";
  const email2 = "umairkhanu07@gmail.com";

  // sending Password
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 2525,
    auth: {
      user: email1,
      pass: "qdnqbnlhzcfbikgr",
    },
  });

  const message = {
    from: email1, // Sender address
    to: e, // List of recipients
    subject: "Your credentials", // Subject line
    html: `<h1>Email: ${e}<br/>Password: ${retVal}<h1><br/><br/><p>Please don't share this with anyone</p>`, // Plain text body
  };
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  //hash
  const enrate = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(retVal, enrate);

  return hash;
};

//create data
const createData = async (req, res) => {
  const { username, subjects, email, period } = req.body;
  //   console.log(req.body);
  if (!username) {
    throw Error("Username is required");
  }
  if (!email) {
    throw Error("Email is required");
  }
  const password = await generatePassword(email);
  console.log(password);

  try {
    const data = await Teacher.create({
      username,
      password,
      subjects,
      email,
      period,
    });
    console.log(data);
    // data.save();
    res.status(200).send({ data });
  } catch (err) {
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
