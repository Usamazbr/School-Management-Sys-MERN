const Student = require("../models/stuModel");
const mongoose = require("mongoose");

//get all data
const getAlldata = async (req, res) => {
  try {
    const data = await Student.find({});
    res.status(200).send({ data });
  } catch (err) {
    res.status(404).json({ err: err });
  }
};

//create data
const createData = async (req, res) => {
  const { name, age, subjects, teachers, email, period, role, phone } =
    req.body;
  console.log(req.body);
  if (!name || !age) {
    throw Error("Username and age is required");
  }
  try {
    const data = await Student.create({
      username: name,
      age,
      subjects,
      teachers,
      email,
      period,
      role,
      phone,
    });
    // data.save();
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//edit data
const patchData = async (req, res) => {
  const { username, age, subjects, teachers, email, period, role, phone } =
    req.body;
  const stu_id = req.params.Stu;
  console.log(stu_id);
  console.log(req.body);
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
