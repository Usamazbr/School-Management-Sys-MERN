const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      required: true,
    },
    req_id: {
      type: String,
      required: true,
    },
    authapp: {
      type: String,
      required: false,
    },
    taskapp: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NotSchool", notifySchema);
