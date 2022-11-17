const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: false },
    subjects: [String],
    email: { type: String, required: true },
    period: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teachers", teacSchema);
