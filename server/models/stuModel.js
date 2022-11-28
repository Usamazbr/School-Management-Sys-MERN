const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stuSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: false },
    age: { type: Number, required: true },
    subjects: [String],
    teachers: [String],
    email: { type: String, required: false },
    period: [String],
    role: { type: Number, required: false },
    phone: { type: Number, required: false },
    results: [
      {
        classname: { type: String },
        midterms: { type: Number, max: 50 },
        finals: { type: Number, max: 50 },
      },
    ],
    image: { type: String, required: false },
    admin_id: {
      type: String,
      required: true,
    },
    teac_id: [String],
    self_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", stuSchema);
