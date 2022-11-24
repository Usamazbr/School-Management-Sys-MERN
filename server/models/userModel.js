const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      // unique: true,
      // trim: true,
      // maxlength: [50, "Name must be less than 50 Char"],
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Number,
      required: true,
    },
    // notifies:[{}],
  },
  {
    timestamps: true,
  }
);

// login
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  let already = await this.find({ email });
  console.log("already: " + already);
  if (!already[0]) {
    throw Error("Incorrect email");
  }
  let compare = false;
  for (let i = 0; i < already.length; i++) {
    console.log(compare);
    compare = await bcrypt.compare(password, already[i].password);
    already = already[i];
    console.log("iterrative" + already);
  }
  // const compare = await bcrypt.compare(password, already.password);
  if (!compare) {
    throw Error("Incorrect password");
  }
  console.log("modified already: " + already);
  return already;
};

// signup
userSchema.statics.signup = async function (email, password, admin) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const already = await this.findOne({ email, admin });
  if (already) {
    throw Error("Email is already in use");
  }

  //hash
  const enrate = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, enrate);

  // const admin = 1;
  let user;

  if (admin === 1) {
    //creating user
    user = await this.create({ email, password: hash, admin });
  } else {
    user = await this.create({ email, password, admin });
  }

  return user;
};

// Password change
userSchema.statics.change = async function (user, old, new1) {
  // validation
  if (!old || !new1) {
    throw Error("All fields must be filled");
  }

  //hash
  const enrate = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(new1, enrate);

  const compare = await bcrypt.compare(old, user.password);
  if (!compare) {
    throw Error("Incorrect match");
  }

  const data = await this.updateOne(
    { _id: user._id },
    { $set: { password: hash } }
  );

  return data;
};

module.exports = mongoose.model("Username2", userSchema);
