const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stuSchema = new Schema(
  {
    username: { type: String, required: true },
    age: { type: Number, required: true },
    subjects: [String],
    teachers: [String],
    email: { type: String, required: false },
    period: { type: String, required: false },
    role: { type: Number, required: false },
    phone: { type: Number, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", stuSchema);
