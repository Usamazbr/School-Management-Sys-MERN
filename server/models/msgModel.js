const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = new Schema(
  {
    teac_name: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    recievers: [String],
    alertType: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", msgSchema);
