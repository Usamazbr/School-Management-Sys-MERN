const Student = require("../models/stuModel");
const mongoose = require("mongoose");

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

//create data
const createData = async (req, res) => {
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
  } = req.body;
  // console.log(req.body);
  if (!username || !age) {
    throw Error("Username and age is required");
  }
  try {
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
    });
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

module.exports = { getAlldata, createData, patchData, deleteData };
