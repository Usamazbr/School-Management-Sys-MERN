const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stuSchema = new Schema(
  {
    username: { type: String, required: true },
    age: { type: Number, required: true },
    subjects: [String],
    teachers: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", stuSchema);
