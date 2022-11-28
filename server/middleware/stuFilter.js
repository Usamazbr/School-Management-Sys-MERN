const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// User token authentication
const stuFilter = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = stuFilter;
