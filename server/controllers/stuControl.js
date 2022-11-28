const Teacher = require("../models/teacModel");
const Student = require("../models/stuModel");
const Message = require("../models/msgModel");
const mongoose = require("mongoose");

const { signupUser } = require("./userController");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//get all data
const getAlldata = async (req, res) => {
  const admin_id = req.user._id;
  const teac_id = req.params.Stu;
  console.log(admin_id);
  console.log(teac_id);
  try {
    let data = await Student.find({ admin_id }).sort({ updatedAt: -1 });
    // console.log(data);
    if (!data[0]) {
      data = await Student.find({ teac_id }).sort({ updatedAt: -1 });
    }
    res.status(200).send({ data });
  } catch (err) {
    res.status(404).json({ err: err });
  }
};

//get one
const getOne = async (req, res) => {
  const self_id = req.user._id;

  console.log(self_id);
  try {
    let data = await Student.findOne({ self_id });
    // console.log(data);

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

  //hash
  const enrate = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(retVal, enrate);
  const pass = { retVal, hash };

  return pass;
};

// generate email to send credentials
const generateEmail = async (e, ea, pass) => {
  console.log(e, ea, pass);
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
  const admin_id = req.user._id;
  const admin = 3;
  const {
    user,
    username,
    age,
    subjects,
    teachers,
    email,
    period,
    role,
    phone,
    image,
    teac_id,
  } = req.body;
  // console.log(req.body);
  if (!username || !age) {
    throw Error("Username and age is required");
  }
  const password = await generatePassword();
  console.log(password);
  const a = { body: { email, password: password.hash, admin } };
  try {
    const self_id = await signupUser(a);
    await generateEmail(email, user.email, password.retVal);
    const data = await Student.create({
      username,
      age,
      subjects,
      teachers,
      email,
      period,
      role,
      phone,
      image,
      admin_id,
      teac_id,
      self_id,
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
  const admin_id = req.user._id;
  const {
    username,
    age,
    subjects,
    teachers,
    email,
    period,
    role,
    phone,
    image,
    teac_id,
    self_id,
  } = req.body;
  const stu_id = req.params.Stu;
  console.log(stu_id);
  // console.log(req.body);
  try {
    const data = await Student.findByIdAndUpdate(
      stu_id,
      {
        username,
        age,
        subjects,
        teachers,
        email,
        period,
        role,
        phone,
        image,
        admin_id,
        teac_id,
        self_id,
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
  const stu_id = req.params.Stu;
  try {
    const data = await Student.findByIdAndDelete({ _id: stu_id });
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// patch result
const patchRes = async (req, res) => {
  console.log(req.body, req.params);
  try {
    const data = await Student.findByIdAndUpdate(
      { _id: req.params.Stu },
      {
        $set: { results: req.body },
      }
    );
    res.status(200).send({ data });
    // console.log(data);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// leave request via email
const leaveReq = async (req, res) => {
  console.log(req.body);
  const { teachers } = req.body;
  const student = req.user.email.split("@")[0];
  console.log("User: " + req.user);

  const ea = "usamaengine@gmail.com";
  // sending Password
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 2525,
    auth: {
      user: ea,
      pass: "sdhepoviekctlvos",
    },
  });
  let data;

  try {
    data = await Teacher.find({ teachers }).select("email");
  } catch (err) {
    res.status(404).json({ err: err });
  } finally {
    const emails = data.map((e) => e.email);

    console.log("\x1b[33mstuControl line 235:\x1b[0m ");
    console.log(emails);

    const message = {
      from: ea, // Sender address
      to: emails, // List of recipients
      subject: `Leave request`, // Subject line
      html: `<p>${student} has requested for leave.</p>`, // Plain text body
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info.response);
      }
    });
  }
};

// sending message via email
const msgEmail = async (subj, msg, email) => {
  console.log(subj, msg, email);

  const ea = "usamaengine@gmail.com";
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
    to: email, // List of recipients
    subject: subj, // Subject line
    html: `<p>Message: ${msg}</p>`, // Plain text body
  };
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
};

// post message
const createMsg = async (req, res) => {
  const { subject, message, recievers, alertType, stuEms } = req.body;
  const teac_name = req.user.email.split("@")[0];

  if (!subject || !message) {
    throw Error("Contents are required");
  }
  if (!recievers) {
    throw Error("Reciever Error");
  }
  if (alertType === 3) {
    console.log("send email");
    msgEmail(subject, message, stuEms);
  }
  try {
    const data = await Message.create({
      teac_name,
      subject,
      message,
      recievers,
      alertType,
    });
    console.log(data);
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// fetch message
const fetchMsg = async (req, res) => {
  const res_id = req.params.Stu;
  console.log("message is fetched");
  console.log(res_id);
  // const self_id = req.user._id;
  console.log(req.body);
  try {
    let data = await Message.find({ recievers: res_id });
    // console.log(data);

    res.status(200).send({ data });
  } catch (err) {
    res.status(404).json({ err: err });
  }
};

module.exports = {
  getAlldata,
  createData,
  patchData,
  deleteData,
  patchRes,
  getOne,
  createMsg,
  fetchMsg,
  leaveReq,
};
